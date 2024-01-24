import { Button, Input } from "@mui/joy";
import React, { useState } from "react";

//icon
import SearchIcon from '@mui/icons-material/Search';

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
        <Button className="text-blue-500 hover:scale-110"  onClick={() => handleSearch(props.searchIn)} variant="plain">
          <SearchIcon />
        </Button>
      }
    />
  );
}
