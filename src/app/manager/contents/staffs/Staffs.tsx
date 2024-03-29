import { Button } from "@mui/joy";
import React, { useState } from "react";
import StaffList from "./StaffList";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Staffs() {
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row space-x-4">
          <p className="text-2xl font-bold">Nhân viên</p>
          <Button variant="outlined">
            <p className="hidden lg:block">Thêm hồ sơ</p>
            <AddOutlinedIcon className="text-sm" />
          </Button>
        </div>
      </div>
      <StaffList />
    </div>
  );
}
