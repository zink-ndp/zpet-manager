import { Button } from "@mui/joy";
import React, { useState } from "react";
import Image from "next/image";
import defaultImg from "./default.png"
import VouchersList from "./VouchersList";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function Vouchers() {
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row space-x-4">
          <p className="text-2xl font-bold">Khuyến mãi</p>
          <Button variant="outlined">
            <p className="hidden lg:block">Thêm khuyến mãi</p>
            <AddOutlinedIcon className="text-sm" />
          </Button>
        </div>
      </div>
      <VouchersList />
    </div>
  );
}
