import React, { useState } from "react";
import { Button } from "@mui/joy";
import SearchBar from "@/app/component/ui/SearchBar";
import PetsList from "./PetsList";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function Pets() {
  
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row">
          <p className="text-2xl font-bold">Thú cưng</p>
          <Button variant="outlined" className="ml-3">
            <p className="hidden lg:block">
                Thêm hồ sơ
            </p>
            <AddOutlinedIcon className="text-sm"/>
          </Button>
        </div>
        {/* <div className="flex flex-row w-auto lg:w-[1000px] items-center justify-end">
          <SearchBar
            className={`lg:flex ${searchShow ? "hidden" : "flex"} `}
            text="Tìm kiếm thú cưng"
            searchIn="pet"
          />
          {searchShow ? icSearch : icClose}
        </div> */}
      </div>
      <PetsList/>
    </div>
  );
}
