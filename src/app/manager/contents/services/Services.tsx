import { Button } from "@mui/joy";
import React from "react";
import ServicesList from "./ServicesList";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function Services() {
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row space-x-4">
          <p className="text-2xl font-bold">Dịch vụ</p>
          <Button variant="outlined">
            <p className="hidden lg:block">Thêm</p>
            <AddOutlinedIcon className="text-sm"/>
          </Button>
        </div>
      </div>
      <ServicesList />
    </div>
  );
}
