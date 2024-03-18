"use client";
import { useState } from "react";
import Image from "next/image";
import BackgroundMain from "../component/ui/BackgroundMain";
import { FormLabel, Radio, RadioGroup, Sheet, styled } from "@mui/joy";
import React from "react";
import { People, Person } from "@mui/icons-material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { cookies } from "next/headers";
import axios from "axios";
import Loading from "../component/Loading";

import { login } from "../session/login";

export default function Page() {
  const iconDecoration = [<Person key={0} />, <People key={1} />];

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [roleName, setRoleName] = useState("");
  const [role, setRole] = useState<number>(0);
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = async (email: string, pw: string, role: number) => {
    setShowLoading(!showLoading);
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/staffs/login/${email}&${pw}&${role}`
      );
      const data: any = await response.data.data;
      const message: string = await response.data.message;
      if (data.length == 0) {
        alert(message);
        setShowLoading(false);
      } else {
        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
        login(data);
      }
    } catch (err: any) {
      console.error("Error fetching info:", err);
    }
  };

  return (
    <>
      <div className=" flex justify-center h-[100vh] w-[100%] fixed z-10">
        <div className=" place-self-center bg-white shadow-lg rounded-lg flex flex-col lg:flex-row h-[auto] w-[85%] lg:h-[65%] lg:w-[60%]">
          <Image
            className=" rounded-xl w-[50%] object-cover lg:block hidden"
            src="https://images.unsplash.com/photo-1601758175576-648226072e90?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dogcat"
            width={700}
            height={300}
          />

          <div className="flex flex-col w-[100%] h-[100%] justify-center items-center p-10 lg:px-32 space-y-6">
            <span className="text-black text-4xl bold w-full">
              Đăng nhập hệ thống <p className="text-blue-500">ZPet</p>
            </span>
            <input
              className="bg-white w-full border-2 border-blue-300 p-3 rounded-md text-black"
              type="text"
              name="email"
              id="ipEmail"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="bg-white w-full border-2 border-blue-300 p-3 rounded-md text-black"
              type="password"
              name="password"
              id="ipPw"
              placeholder="Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <RadioGroup
              aria-label="platform"
              overlay
              name="platform"
              sx={{
                flexDirection: "row",
                gap: 2,
              }}
            >
              {["Nhân viên", "Quản lý"].map((value, index) => (
                <Sheet
                  key={value}
                  variant="outlined"
                  color={roleName == value ? "primary" : "neutral"}
                  sx={{
                    borderRadius: "md",
                    boxShadow: "sm",
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    minWidth: 150,
                  }}
                >
                  <Radio
                    id={value}
                    value={value}
                    defaultChecked={false}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    onChange={() => {
                      setRoleName(value);
                      setRole(index);
                    }}
                    className="ml-5"
                  />
                  <FormLabel htmlFor={value}>{value}</FormLabel>
                  {iconDecoration[index]}
                </Sheet>
              ))}
            </RadioGroup>
            <button
              className=" w-full bg-blue-500 hover:bg-blue-300 bold p-3 rounded-md disabled:bg-blue-100"
              disabled={!email || !pass || !roleName}
              onClick={() => handleLogin(email, pass, role)}
            >
              Đăng nhập
            </button>
            <div className={` ${showLoading ? "flex" : "hidden"} flex-col items-center justify-center`}>
              <Loading />
              <p className="text-blue-500">Đang đăng nhập</p>
            </div>
          </div>
        </div>
      </div>
      <BackgroundMain />
    </>
  );
}
