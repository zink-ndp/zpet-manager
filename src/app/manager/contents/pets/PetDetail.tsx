/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/joy";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

var date_format = require("date-format");

export default function PetDetail(props: any) {
  const [petInfo, setPetInfo] = useState<Array<any>>([""]);
  const [petImgs, setPetImgs] = useState<Array<any>>([props.mainImg]);
  const [error, setError] = useState<string | null>(null);

  const [showingImg, setShowingImg] = useState(props.mainImg);
  const [showingIndex, setShowingIndex] = useState(1);

  const fetchPetInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/pets/" + props.id
      );
      const data: any = await response.data.data;
      setPetInfo(data);
    } catch (err: any) {
      setError(err);
    }
  };

  const fetchPetImgs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/pets/" + props.id + "/imgs"
      );
      const data: any = await response.data.data;
      setPetImgs(data);
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchPetInfo();
    fetchPetImgs();
  }, []);

  const lenImgList: number = petImgs.length
  console.log(petImgs, lenImgList)

  const getNextImg = (showingIndex: number)=>{
    if (showingIndex === lenImgList-1){
      setShowingIndex(0)
    } else {
      setShowingIndex(showingIndex+1)
    }
    console.log(showingIndex, petImgs[showingIndex])
    const img = require(`./pet-images/${petImgs[showingIndex].PIMG_LINK}`)
    setShowingImg(img)
  }

  const getPreImg = (showingIndex: number)=>{
    if (showingIndex === 0){
      setShowingIndex(lenImgList-1)
    } else {
      setShowingIndex(showingIndex-1)
    }
    const img = require(`./pet-images/${petImgs[showingIndex].PIMG_LINK}`)
    setShowingImg(img)
  }

  return (
    <>
      <div className="flex flex-col p-2 justify-center items-center">
        <p className="text-xl font-bold mt-1 self-center">Chi tiết thú cưng</p>
        <div className="flex flex-row mt-5 items-center justify-center">
          <div className="flex flex-row m-5">
            {/* <Image
              className=" object-cover h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-xl shadow-lg"
              alt="petimg"
              fill={false}
              src={props.mainImg}
            /> */}
            <div className="text-blue-400 mx-2 p-1 hover:text-blue-700 hover:scale-125 hover:bg-blue-100 rounded-full self-center"
              onClick={()=>{
                getNextImg(showingIndex)
              }}>
              <NavigateBeforeIcon  />
            </div>
            <Image
              className=" flex-1 object-cover h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-xl shadow-lg"
              alt="petimg"
              fill={false}
              src={showingImg}
            />
            <div className="text-blue-400 mx-2 p-1 hover:text-blue-700 hover:scale-125 hover:bg-blue-100 rounded-full self-center"
              onClick={()=>{
                getNextImg(showingIndex)
              }}>
              <NavigateNextIcon  />
            </div>
          </div>
          <div className="flex flex-col justify-start m-5">
            <p className="text-black text-lg lg:text-xl ">
              <span className="text-blue-700 font-semibold">Tên: </span>
              {petInfo[0].P_NAME}
            </p>
            <p className="text-black text-lg lg:text-xl ">
              <span className="text-blue-700 font-semibold">Giống: </span>
              {petInfo[0].PT_NAME + " " + petInfo[0].P_SPECIE}
            </p>
            <p className="text-black text-lg lg:text-xl ">
              <span className="text-blue-700 font-semibold">
                Ngày sinh (d/m/y):{" "}
              </span>
              {date_format("dd/MM/yyyy", new Date(petInfo[0].P_BIRTHDAY))}
            </p>
            <p className="text-black text-lg lg:text-xl ">
              <span className="text-blue-700 font-semibold">Giới tính: </span>
              {petInfo[0].P_GENDER ? "Cái" : "Đực"}
            </p>
            <p className="text-black text-lg lg:text-xl ">
              <span className="text-blue-700 font-semibold">Tên chủ: </span>
              {petInfo[0].CTM_NAME}
            </p>
          </div>
        </div>

        <p className="text-blue-700 font-bold mt-5 mb-2 text-xl">Sức khoẻ</p>

        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row w-full bg-blue-50 rounded-xl">
            <p className="text-black font-semibold">
              <span className="text-blue-700">Ngày khám: </span>
              24/11/2022
            </p>
            <p className="text-black font-semibold">
              <span className="text-blue-700">Cân nặng: </span>
              21kg
            </p>
            <p className="text-black font-semibold">
              <span className="text-blue-700">Tình trạng sức khoẻ: </span>
              Tốt
            </p>
          </div>
          <Button
            className="mt-3 w-full self-center lg:max-w-[70%]"
            onClick={function () {}}
            variant="outlined"
          >
            Xem thêm lịch sử sức khoẻ
          </Button>
        </div>
      </div>
    </>
  );
}
