import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col">
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
        className="input-form border-slate-300 text-slate-500"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Mô tả: </p>
      <input
        className="input-form border-slate-300 text-slate-500"
        type="text"
        value={des}
        onChange={(e) => {
          setDes(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Giá: </p>
      <input
        className="input-form border-slate-300 text-slate-500"
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
        className="input-form border-slate-300 text-slate-500"
        onChange={()=>{
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
          console.log(isInfoChanged);
        }}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
}
