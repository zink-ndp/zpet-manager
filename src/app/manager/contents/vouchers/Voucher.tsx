import React from "react";
import { formatMoney } from "@/app/functions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Badge from "@mui/joy/Badge";
import Image from "next/image";
import defaultImg from "./default.png"

export default function Voucher(props: any) {
  const voucher = props.info;
  return (
    <div className=" bg-blue-100 rounded-xl shadow-md p-5 flex flex-row ">
      <div className="text-blue-700 font-semibold flex flex-row space-x-10 flex-1">
        <Badge badgeContent={voucher.VOU_ISAVAILABLE ? "Available" : "Disabled"} color={voucher.VOU_ISAVAILABLE ? "success" : "danger"}>
          <Image alt="srvImg" src={defaultImg} width={50} height={50} />
        </Badge>
        <div className="flex flex-col lg:flex-row lg:space-x-2">
          <p>{voucher.VOU_NAME}</p>
          <p className="hidden lg:block"> - </p>
          <p className="text-green-700">{voucher.VOU_PERCENT}%</p>
        </div>
      </div>
      <p className=" text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110">
        <BorderColorIcon />
      </p>
    </div>
  );
}
