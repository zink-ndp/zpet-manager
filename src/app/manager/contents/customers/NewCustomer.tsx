import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "@/app/utils/apiUrl";

export default function NewCustomer() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  async function handleNewCus() {
    try {
      const response = await axios.post(
        apiUrl+"/api/v1/customers",
        {
            phone: phone,
            name: name,
        }
      );
      alert("Thêm khách hàng thành công!")
    } catch (error) {
        alert(error)
    }
  }

  return (
    <div className="text-black flex flex-col space-y-4">
      <p className="text-xl text-blue-700 font-bold">Thêm khách hàng mới</p>
      <div className="flex flex-col">
        <p className="text-blue-500 font-semibold">Số điện thoại:</p>
        <input
          required
          minLength={10}
          className="input-form"
          type="phone"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-blue-500 font-semibold">Tên KH:</p>
        <input
          required
          className="input-form"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button className="primary-btn" onClick={() => handleNewCus()}>
        Thêm
      </button>
    </div>
  );
}
