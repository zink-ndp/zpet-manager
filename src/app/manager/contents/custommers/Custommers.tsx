import SearchBar from "@/app/component/ui/SearchBar";
import { Button } from "@mui/joy";
import React, { useState } from "react";
import CustommerList from "./CustommerList";

export default function Custommers() {
  const [searchShow, setSearchShow] = useState(true);

  const icClose = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 ml-5 lg:hidden"
      onClick={() => setSearchShow(!searchShow)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  const icSearch = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7 ml-5 lg:hidden"
      onClick={() => setSearchShow(!searchShow)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row">
          <p className="text-2xl font-bold">Khách hàng</p>
          <Button variant="plain" className="ml-3">
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
        <div className="flex flex-row w-auto lg:w-[1000px] items-center justify-end">
          <SearchBar
            className={`lg:flex ${searchShow ? "hidden" : "flex"} `}
            text="Tìm kiếm thú cưng"
            searchIn="pet"
          />
          {searchShow ? icSearch : icClose}
        </div>
      </div>
      <CustommerList/>
    </div>
  );
}
