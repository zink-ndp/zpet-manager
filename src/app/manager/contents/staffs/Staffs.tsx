import { Button } from "@mui/joy";
import React, { useState } from "react";
import StaffList from "./StaffList";

export default function Staffs() {
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row">
          <p className="text-2xl font-bold">Nhân viên</p>
          <Button variant="outlined" className="ml-3">
            <p className="hidden lg:block">Thêm hồ sơ</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 lg:ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </div>
      <StaffList />
    </div>
  );
}
