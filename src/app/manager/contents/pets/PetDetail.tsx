/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import petImg from "../../../../pet-images/11.jpg"
import PetHealth from "./PetHealth";
import { List, ListItem } from "@mui/joy";
import axios from "axios";

export default function PetDetail(props:any) {

  const [petInfo, setPetInfo] = useState<Array<any>>([''])
  const [petImgs, setPetImgs] = useState<Array<any>>([''])
  const [error, setError] = useState<string|null>(null)

  const fetchPetInfo = async() => {
    try {
      const response = await axios.get("http://localhost:3100/api/v1/pets/"+props.id)
      const data: any = await response.data.data
      setPetInfo(data)
    } catch (err:any) {
      setError(err)
    }
  }

  const fetchPetImgs = async() => {
    try {
      const response = await axios.get("http://localhost:3100/api/v1/pets/"+props.id+"/imgs")
      const data: any = await response.data.data
      setPetImgs(data)
    } catch (err:any) {
      setError(err)
    }
  }

  useEffect((()=>{
    fetchPetInfo()
    fetchPetImgs()
  }),[])

  return (
    <>
      <div className="flex flex-col p-2">
        <p className="text-xl font-bold mt-1 self-center">Chi tiết thú cưng</p>
        <div className="flex flex-row mt-5">
            <div className="flex m-5">
                <Image
                    className=" object-cover h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-xl shadow-lg"
                    alt="petimg"
                    fill={false}
                    src={props.mainImg}
                />
            </div>
            <div className="flex flex-col justify-start m-5">
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Tên: </span>
                    {petInfo[0].P_NAME}
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Giống: </span>
                    {petInfo[0].P_SPECIE}
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Ngày sinh: </span>
                    {petInfo[0].P_BIRTHDAY}
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Giới tính: </span>
                    {petInfo[0].P_GENDER}
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Tên chủ: </span>
                    {petInfo[0].CTM_NAME}
                </p>
            </div>
        </div>
        <p className="text-blue-700 font-bold m-5 text-xl">Lịch sử sức khoẻ <span className=" font-light text-black">(5 lần gần nhất)</span></p>
        <div className="flex flex-col">
            {[...Array(5)].map((item, index) => (
              <ListItem key={index}><PetHealth/></ListItem>
            ))}
        </div>
      </div>
    </>
  );
}
