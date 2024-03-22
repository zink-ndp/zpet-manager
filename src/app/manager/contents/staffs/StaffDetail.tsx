import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";

export default function StaffDetail(props: any) {
  const staff = props.info;

  const id = staff.STF_ID;
  const [name, setName] = useState(staff.STF_NAME);
  const [phone, setPhone] = useState(staff.STF_PHONE);
  const [email, setEmail] = useState(staff.STF_EMAIL);
  const [pw, setPw] = useState(staff.STF_PASSWORD);
  const [rpw, setRpw] = useState(staff.STF_PASSWORD);
  const [isWorking, setIsWorking] = useState(staff.STF_ISWORKING);
  const [role, setRole] = useState(staff.STF_ISMANAGER);

  const [isInfoChanged, setIsInfoChanged] = useState(false);

  function setDefault() {
    setName(staff.STF_NAME);
    setPhone(staff.STF_PHONE);
    setEmail(staff.STF_EMAIL);
    setPw(staff.STF_PASSWORD);
    setRpw(staff.STF_PASSWORD);
    setIsWorking(staff.STF_ISWORKING);
    setRole(staff.STF_ISMANAGER);
    setIsInfoChanged(false);
  }

  return (
    <div className=" flex flex-col">
      <p className="text-black font-bold text-lg mt-3">Thông tin nhân viên</p>
      <p className="text-black text-lg mt-3">
        Mã nhân viên:
        <span className="italic text-slate-500 text-sm"> (Không thay đổi)</span>
      </p>
      <input
        tabIndex={1}
        className="input-form border-slate-300 text-slate-500"
        value={id}
        disabled
      />
      <p className="text-black text-lg mt-3">Tên nhân viên:</p>
      <input
        tabIndex={2}
        className="input-form"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setIsInfoChanged(true)
        }}
      />
      <p className="text-black text-lg mt-3">Số điện thoại:</p>
      <input
        tabIndex={3}
        className="input-form"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setIsInfoChanged(true)
        }}
      />
      <p className="text-black text-lg mt-3">Email:</p>
      <input
        tabIndex={4}
        className="input-form"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsInfoChanged(true)
        }}
      />
      <p className="text-black text-lg mt-3">Mật khẩu:</p>
      <input
        tabIndex={5}
        className="input-form"
        value={pw}
        type="password"
        name="password"
        onChange={(e) => {
          setPw(e.target.value);
          setIsInfoChanged(true)
        }}
      />
      <p className="text-black text-lg mt-3">
        Nhập lại mật khẩu{" "}
        <span className="text-slate-600 italic text-sm">
          (khi thay đổi mật khẩu)
        </span>
        :
      </p>
      <input
        tabIndex={5}
        className="input-form"
        value={rpw}
        type="password"
        name="password"
        onChange={(e) => {
          setRpw(e.target.value);
          setIsInfoChanged(true)
        }}
      />

      <p className="text-black text-lg mt-3">Vai trò:</p>
      <select
        tabIndex={4}
        className="input-form"
        onChange={(e) => {
          setIsWorking(e.target.value);
          setIsInfoChanged(true)
        }}
      >
        <option value="0" selected={role ? false : true}>
          Nhân viên
        </option>
        <option value="1" selected={role ? true : false}>
          Quản lý
        </option>
      </select>

      <p className="text-black text-lg mt-3">Trạng thái:</p>
      <select
        tabIndex={4}
        className="input-form"
        onChange={(e) => {
          setRole(e.target.value);
          setIsInfoChanged(true)
        }}
      >
        <option value="0" selected={isWorking ? false : true}>
          Đã nghỉ việc
        </option>
        <option value="1" selected={isWorking ? true : false}>
          Còn làm việc
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
        onClick={()=>{
            console.log(isInfoChanged)
        }}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
}
