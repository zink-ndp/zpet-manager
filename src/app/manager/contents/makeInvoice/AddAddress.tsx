"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap, useMapEvent, useMapEvents } from "react-leaflet/hooks";

import { RAPID_API_KEY } from "@/app/utils/mapKey";

import "../../../../../public/leaflet/leaflet.css";
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  PointExpression,
} from "leaflet";
import axios from "axios";

export default function AddAddress(props: any) {
  const shopPosition = [10.030183, 105.772163] as LatLngTuple;

  const [position, setPosition] = useState<LatLngTuple>([0, 0]);
  const [distance, setDistance] = useState<number>(0);
  const [receiver, setReceiver] = useState("");
  const [province, setProvince] = useState("Chưa xác định");
  const [district, setDistrict] = useState("Chưa xác định");
  const [ward, setWard] = useState("Chưa xác định");
  const [note, setNote] = useState("Chưa xác định");

  function PutMarker() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const map = useMapEvent("click", (e) => {
      const clickedPos: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      setPosition(clickedPos);
    });
    return null;
  }

  const optionsDistance = {
    method: "GET",
    url: "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix",
    params: {
      origins: shopPosition[0].toString() + ", " + shopPosition[1].toString(),
      destinations: position[0].toString() + ", " + position[1].toString(),
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "trueway-matrix.p.rapidapi.com",
    },
  };

  const fetchDistance = async () => {
    try {
      const response = await axios.request(optionsDistance);
      const dist = parseFloat(response.data.distances[0][0]) / 1000;
      setDistance(dist);
    } catch (error) {
      console.error(error);
    }
  };

  const optionsInfo = {
    method: "GET",
    url: "https://location-to-address.p.rapidapi.com/v1/geocode/reverse",
    params: {
      lon: position[1].toString(),
      lat: position[0].toString(),
      limit: "1",
      lang: "en",
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "location-to-address.p.rapidapi.com",
    },
  };

  const fetchInfo = async () => {
    try {
      const response = await axios.request(optionsInfo);
      console.log(response.data.features[0].properties);
      const property = response.data.features[0].properties;
      setProvince(property.city);
      setDistrict(property.suburb);
      setWard(property.quarter);
      setNote(property.housenumber + ", " + property.street);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDistance();
    fetchInfo();
  }, [position]);

  async function handleAddAdr() {
    console.log(
      props.cusId,
      receiver,
      province,
      district,
      ward,
      note,
      position[0],
      position[1],
      distance
    );
    try {
      const response = await axios.post(
        "http://localhost:3100/api/v1/customers/" + props.cusId + "/address",
        {
          receiver: receiver,
          province: province,
          district: district,
          ward: ward,
          note: note,
          lat: position[0],
          lng: position[1],
          dist: distance,
        }
      )
      alert("Thêm thành công!")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col mt-8">
        <MapContainer
          className="h-[350px] lg:h-[500px]"
          center={shopPosition}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={shopPosition}>
            <Popup>Vị trí cửa hàng</Popup>
          </Marker>

          <Marker position={position}>
            <Popup>Vị trí đã chọn</Popup>
          </Marker>

          <PutMarker />
        </MapContainer>
        <p className="mt-4 text-blue-600 text-xl font-semibold">
          Khoảng cách: <span className="text-black">{distance} km</span>
        </p>
        <div className="flex flex-col lg:flex-row lg:mt-3">
          <p className="mt-4 text-blue-600 text-xl font-semibold">
            Tên người nhận:
          </p>
          <input
            type="text"
            name="receiver"
            placeholder="Nhập tên người nhập"
            className="input-form w-auto font-normal ml-4 flex-1"
            id=""
            value={receiver}
            onChange={(e) => {
              setReceiver(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:mt-3">
          <p className="mt-4 text-blue-600 text-xl font-semibold">
            Tỉnh/ Thành phố:
          </p>
          <input
            type="text"
            name="province"
            className="input-form w-auto font-normal ml-4 flex-1"
            id=""
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:mt-3">
          <p className="mt-4 text-blue-600 text-xl font-semibold">
            Quận/ Huyện:
          </p>
          <input
            type="text"
            name="district"
            className="input-form w-auto font-normal ml-4 flex-1"
            id=""
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:mt-3">
          <p className="mt-4 text-blue-600 text-xl font-semibold">
            Xã/ Phường:
          </p>
          <input
            type="text"
            name="ward"
            id=""
            className="input-form w-auto font-normal ml-4 flex-1"
            value={ward}
            onChange={(e) => {
              setWard(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:mt-3">
          <p className="mt-4 text-blue-600 text-xl font-semibold">Ghi chú:</p>
          <input
            type="text"
            name="ward"
            id=""
            className="input-form w-auto font-normal ml-4 flex-1"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
        <button onClick={handleAddAdr} className="primary-btn mt-5">
          Thêm địa chỉ mới
        </button>
      </div>
    </>
  );
}
