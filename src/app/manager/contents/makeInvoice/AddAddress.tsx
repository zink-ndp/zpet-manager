"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { MAP_API_KEY } from "@/app/utils/mapKey";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export default function AddAddress() {
  const mapRef = useRef<HTMLDivElement>(null);

  const [userPos, setUserPos] = useState<any>();

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: MAP_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      const position = { lat: 10.031000216669089, lng: 105.76931230714735 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 13,
        mapId: "MY_ZPET_MAP_ID",
      };
      // init
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      //control
      let infoWindow = new google.maps.InfoWindow();

      const shopMarker = new AdvancedMarkerElement({
        map,
        position: position,
      });

      map.addListener("click", (mapsMouseEvent: any) => {
        setUserPos(mapsMouseEvent.latLng.toJSON());
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent("Vị trí bạn chọn");
        infoWindow.open(map);
      });

      const marker = new AdvancedMarkerElement({
        map,
        position: userPos,
      });
    };

    initMap();
  }, []);

  console.log(userPos);
  return (
    <>
      <div className="flex flex-col">
        <div className="h-[300px] w-full mt-8" ref={mapRef}></div>
      </div>
    </>
  );
}
