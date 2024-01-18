import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import Checkbox from "@mui/joy/Checkbox";
import { getToday } from "@/app/functions";

export default function MakeInvoice() {
  const today = getToday();

  const staffName = "Nguyen Van V";
  const staffId = "92837";

  const testOption = ["opt1", "opt2", "opt3"];

  const [phone, setPhone] = useState<String | null>("");
  const [cusName, setCusName] = useState<String | null>("");
  const [pet, setPet] = useState<String | null>("");
  const [service, setService] = useState<String[] | any>();
  const [shipPet, setShipPet] = useState(false);
  const [address, setAddress] = useState<String | null>("");
  const [fee, setFee] = useState(0);

  return (
    <>
      <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
        <p className="text-2xl font-bold">Lập hoá đơn</p>
        <p className="text-lg mt-4">
          Ngày lập: <p className="font-bold">{today}</p>
        </p>
        <p className="text-lg mt-4">
          Nhân viên:{" "}
          <p className="font-bold">
            {staffName} - {staffId}
          </p>
        </p>
        <p className="text-lg mt-4">Số điện thoại</p>
        <Autocomplete
          placeholder="Số điện thoại khách hàng"
          options={testOption}
          value={phone}
          className="w-full h-[50px]"
          onChange={(event, nValue) => {
            setPhone(nValue);
          }}
        />
        <p className="text-lg mt-4">Tên khách hàng</p>
        <Autocomplete
          placeholder="Tên khách hàng"
          options={testOption}
          className="w-full h-[50px]"
          value={cusName}
          onChange={(event, nValue) => {
            setCusName(nValue);
          }}
        />
        <p className="text-lg mt-4">Thú cưng</p>
        <Autocomplete
          placeholder="Thú cưng của Khách hàng"
          options={testOption}
          className="w-full h-[50px]"
          value={pet}
          onChange={(event, nValue) => {
            setPet(nValue);
          }}
        />
        <p className="text-lg mt-4">Dịch vụ</p>
        <Autocomplete
          multiple
          placeholder="Dịch vụ"
          limitTags={4}
          options={testOption}
          getOptionLabel={(option) => option}
          onChange={(event, nValue) => {
            setService(nValue)
            console.log(service)
          }}
          className="w-full h-[50px]"
        />

        <p className="text-lg mt-4">
          Đơn giá dịch vụ tạm tính: <p className="font-bold">{fee}đ</p>
        </p>
        <Checkbox
          className="text-xl mt-4 font-semi-bold"
          label="Áp dụng giao thú cưng tận nhà:"
          size="lg"
          checked={shipPet}
          onChange={(e) => setShipPet(!shipPet)}
        />
        {shipPet && (
          <div>
            <p className="text-lg mt-4">Địa chỉ:</p>
            <Autocomplete
              placeholder="Địa chỉ"
              options={testOption}
              className="w-full h-[50px]"
            />
            <p className="text-md mt-2">Phí vận chuyển: {fee}đ</p>
          </div>
        )}
      </div>
      <button
        className="bg-blue-200 fixed bottom-10 right-10 sidebar-btn"
        onClick={(e)=>{
            console.log(cusName, service, phone)
        }}
      >test</button>
    </>
  );
}
