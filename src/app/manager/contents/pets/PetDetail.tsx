import React from "react";
import Image from "next/image";
import petImg from "../../../../pet-images/11.jpg"
import PetHealth from "./PetHealth";
import { List, ListItem } from "@mui/joy";

export default function PetDetail() {
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
                    src={petImg}
                />
            </div>
            <div className="flex flex-col justify-start m-5">
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Tên: </span>
                    Bảnh Tỏn
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Giống: </span>
                    Corgi
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Ngày sinh: </span>
                    11/12/2023
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Giới tính: </span>
                    Cái
                </p>
                <p className="text-black text-lg lg:text-xl ">
                    <span className="text-blue-700 font-semibold">Tên chủ: </span>
                    En Thuw
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
