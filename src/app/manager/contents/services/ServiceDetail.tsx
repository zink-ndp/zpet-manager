import { apiUrl } from "@/app/utils/apiUrl";
import { Button } from "@mui/joy";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function ServiceDetail(props: any) {
  const service = props.info;

  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const [name, setName] = useState(service.SRV_NAME);
  const [des, setDes] = useState(service.SRV_DESCRIPTION);
  const [price, setPrice] = useState(service.SRV_PRICE);
  const [status, setStatus] = useState(service.SRV_ISAVAILABLE);

  function setDefault() {
    setName(service.SRV_NAME);
    setDes(service.SRV_DESCRIPTION);
    setPrice(service.SRV_PRICE);
    setStatus(service.SRV_ISAVAILABLE);
    setIsInfoChanged(false);
  }

  async function handleUpdate() {
    console.log(service.SRV_ID, name, des, price, status);
    try {
      const response = await axios.put(apiUrl+"/api/v1/services/"+service.SRV_ID,{
        name: name,
        des: des,
        price: price,
        stt: status,
      })
      alert("Cập nhật thành công!")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-black font-bold text-lg">Thông tin dịch vụ</p>
      <p className="text-black text-lg">
        Mã dịch vụ
        <span className="italic text-slate-500 text-sm"> (Không thay đổi)</span>
      </p>
      <input
        className="input-form border-slate-300 text-slate-500"
        type="text"
        disabled
        value={service.SRV_ID}
      />

      <p className="text-black text-lg">Tên dịch vụ:</p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Mô tả: </p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={des}
        onChange={(e) => {
          setDes(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Giá: </p>
      <input
        className="input-form border-slate-300 text-black"
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Trạng thái: </p>
      <select
        name="stt"
        id=""
        className="input-form border-slate-300 text-black"
        onChange={(e)=>{
          setStatus(parseInt(e.target.value))
          setIsInfoChanged(true);
        }}
      >
        <option selected={!status} value="0">
          Không hoạt động
        </option>
        <option selected={status} value="1">
          Hoạt động
        </option>
      </select>

      <Button
        variant="plain"
        className="mt-5 p-3 rounded-xl"
        onClick={setDefault}
      >
        Đặt lại thông tin
      </Button>

      <Button
        className="primary-btn disabled:primary-disabled-btn"
        disabled={!isInfoChanged}
        onClick={() => {
          handleUpdate();
        }}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
}
