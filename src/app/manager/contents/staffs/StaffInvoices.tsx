import React from "react";

export default function StaffInvoices(props: any) {
  const staff = props.info;
  return (
      <div className=" flex flex-col">
        <p className="text-black font-semi-bold text-lg">
            <span className="text-blue-500">Nhân viên: </span>
            {staff.STF_NAME}
            <span className="text-blue-500"> - Mã: </span>
            {staff.STF_ID}
        </p>
        <p className="text-lg font-bold text-blue-500">Hoá đơn đã lập:</p>
        
      </div>
  )
}
