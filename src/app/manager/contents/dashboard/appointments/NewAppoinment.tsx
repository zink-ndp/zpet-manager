import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import { Input, Textarea } from "@mui/joy";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function NewAppoinment() {
  const testOption = ["opt1", "opt2", "opt3"];

  const [dateTime, setDateTime] = useState('');
  const [phone, setPhone] = useState<String | null>("");
  const [cusName, setCusName] = useState<String | null>("");
  const [service, setService] = useState<String[] | any>();
  const [btnEnable, setBtnEnable] =  useState(false)

  useEffect(() => {
    function checkFormOk() {
      if (!phone || !cusName || !service || !dateTime) return false;
      return true;
    }
    const isOk = checkFormOk();
    isOk ? setBtnEnable(true) : setBtnEnable(false);
  }, [phone, cusName, service, dateTime]);

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl font-bold mt-4 self-center">Thêm lịch hẹn</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          className="w-full h-[45px] mt-7"
          label="Ngày, giờ hẹn"
          onChange={(v:any) => setDateTime(v)}
        />
      </LocalizationProvider>
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
          setService(nValue);
        }}
        className="w-full h-[50px]"
      />
      <p className="text-lg mt-4">Ghi chú:</p>
      <Textarea placeholder="Ghi chú cho cửa hàng…" minRows={3} />
      <button
          className={`justify-center mt-5 ${
            btnEnable ? "primary-btn" : "primary-disabled-btn"
          } `}
          onClick={(e) => {
            console.log(dateTime, cusName, service, phone);
          }}
        >
          Lập hoá đơn
        </button>
    </div>
  );
}
