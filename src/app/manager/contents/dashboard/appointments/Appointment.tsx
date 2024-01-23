import React, { useState } from "react";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function Appointment(props: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [denyInput, setDenyInput] = useState(false);
  const [denyReason, setDenyReason] = useState('');


  return (
    <>
      <div className="bg-blue-50 w-full h-[90px] justify-center rounded-2xl flex flex-row group hover:scale-105 transition-all ease-in-out">
        <Image
          className=" rounded-2xl object-cover h-[90px] w-[90px] shadow-lg"
          src="https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avt"
          height={80}
          width={80}
        />
        <div className="flex flex-row flex-1 w-full content-between ">
          <div className="flex flex-col p-3 ml-4 justify-center">
            <p className="text-blue-800 text-xl font-bold">{props.name}</p>
            <p className="text-black text-lg ">{props.service}</p>
          </div>
          <div className="flex flex-col flex-1 p-3 ml-4 justify-center items-end">
            <p className="text-black text-lg ">24/11/2022</p>
            <p className="text-blue-800 text-xl font-semibold">14:00</p>
          </div>
        </div>
        <button
          className=" place-self-center mr-3 h-full hover:text-blue-500 hover:scale-105 "
          onClick={() => {
            setMenuOpen(!menuOpen);
            setDenyInput(false);
          }}
        >
          <MoreVertIcon />
        </button>
        <div
          className={` ${
            menuOpen ? "flex right-12" : "hidden"
          } flex-row space-x-3 py-2 px-4 bg-white shadow-xl rounded-full absolute h-[55px] mt-4 transition-all ease-in-out`}
        >
          <button className="hover:scale-125">
            <CheckIcon
              className={` ${
                denyInput ? "text-neutral-300" : "text-green-600"
              } `}
            />
          </button>
          <input
            className={` ${
              denyInput ? "w-[150px]" : "hidden w-0"
            } bg-blue-50 rounded-full px-3 transition-all ease-in-out`}
            onChange={(e)=>setDenyReason(e.target.value)}
            placeholder="Lí do từ chối"
            type="text"
          />
          <button
            className="hover:scale-125"
            onClick={() => {
              denyInput ? alert(denyReason) : setDenyInput(!denyInput);
            }}
          >
            <CloseIcon
              className={`text-red-600 ${denyInput ? "scale-125" : ""} `}
            />
          </button>
        </div>
      </div>
    </>
  );
}
