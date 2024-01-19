import { Button, Input } from "@mui/joy";
import React, { useState } from "react";

export default function SearchBar(props: {
  className: string;
  text: string;
  searchIn: string;
}) {
  const [search, setSearch] = useState("");

  function handleSearch(searchIn: string) {
    console.log(search, searchIn)
  }

  return (
    <Input
      placeholder={props.text}
      color="neutral"
      size="lg"
      variant="plain"
      onChange={(e:any) => {
        setSearch(e.target.value);
      }}
      className={` bg-blue-50 rounded-full w-[80%] lg:w-[40%] h-[40px] p-4 items-center ${props.className} `}
      endDecorator={
        <Button onClick={() => handleSearch(props.searchIn)} variant="plain">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
      }
    />
  );
}
