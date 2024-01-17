import React from "react";
import AppointmentsList from "./appointments/AppointmentsList";

export default function Dashboard() {


  return (
    <div
      className={`flex lg:flex-row flex-col-reverse w-full p-4 rounded-xl justify-center lg:space-x-5 space-y-5 `}>
      <div className="flex flex-col p-8 mt-5 lg:mt-0 rounded-xl lg:w-[70%] bg-white shadow-md">
        <p className="text-black font-bold text-2xl">Thống kê</p>
      </div>
      <div className="flex flex-col p-8 rounded-xl lg:w-[30%] bg-white shadow-md">
        <p className="text-black font-bold text-2xl">Lịch hẹn</p>
        <AppointmentsList/>
      </div>
    </div>
  );
}
