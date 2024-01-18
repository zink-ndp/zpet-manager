import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import { Input, Textarea } from "@mui/joy";

export default function NewAppoinment() {
  const testOption = ["opt1", "opt2", "opt3"];

  const [cusName, setCusName] = useState<String | null>("");
  const [phone, setPhone] = useState<String | null>("");
  const [service, setService] = useState<String[] | any>();

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl font-bold mt-4 self-center">Thêm lịch hẹn</p>
      <p className="text-lg mt-4">Số điện thoại</p>
      <Autocomplete
        placeholder="Số điện thoại khách hàng"
        options={testOption}
        value={phone}
        className="w-full h-[50px]"
        freeSolo
        onChange={(event, nValue) => {
          setPhone(nValue);
        }}
      />
      <p className="text-lg mt-4">Tên khách hàng</p>
      <Autocomplete
        placeholder="Tên khách hàng"
        options={testOption}
        value={cusName}
        className="w-full h-[50px]"
        freeSolo
        onChange={(event, nValue) => {
          setCusName(nValue);
        }}
      />
      <p className="text-lg mt-4">Dịch vụ</p>
        <Autocomplete
          multiple
          placeholder="Dịch vụ"
          limitTags={4}
          size="lg"
          options={testOption}
          freeSolo={true}
          getOptionLabel={(option) => option}
          onChange={(event, nValue) => {
            setService(nValue)
          }}
          className="w-full h-[50px]"
        />
        <p className="text-lg mt-4">Ghi chú:</p>
        <Textarea placeholder="Ghi chú cho cửa hàng…" minRows={3}/>
    </div>
  );
}
