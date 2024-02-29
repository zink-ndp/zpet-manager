import React, { useEffect, useState } from "react";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Appointment(props: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [denyInput, setDenyInput] = useState(false);
  const [denyReason, setDenyReason] = useState("");

  const [srvList, setSrvList] = useState<Array<any>>();

  const apm = props.info;

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/appointments/services/${apm.APM_ID}`
      );
      const data = await response.data.data;
      setSrvList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const putAppointmentStt = async (sttId: number) => {
    try {
      const respone = await axios.put(
        `http://localhost:3100/api/v1/appointments/status/${apm.APM_ID}`,
        {
          sttId: sttId,
          sttDescription: denyReason,
        }
      );
    } catch (error) {
      return;
    }
  };

  function handleDeny() {
    putAppointmentStt(4);
    alert("Đã từ chối lịch hẹn");
    setMenuOpen(false);
    setDenyInput(false);
  }

  function handleCheck() {
    switch (apm.STT_ID) {
      case 1:
        putAppointmentStt(2);
        alert("Đã xác nhận lịch hẹn");
        setMenuOpen(false);
        setDenyInput(false);
        break;

      case 2:
        putAppointmentStt(3);
        alert("Đã hoàn thành lịch hẹn");
        setMenuOpen(false);
        setDenyInput(false);
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className="bg-blue-50 w-full h-[90px] justify-center rounded-2xl flex flex-row group hover:scale-105 transition-all ease-in-out">
        <Image
          className=" rounded-2xl object-cover h-[90px] w-[90px] shadow-lg"
          src="https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avt"
          height={80}
          width={80}
        />
        <div className="flex flex-row flex-1 w-full content-between ">
          <div className="flex flex-col p-3 ml-4 justify-center">
            <p className="text-blue-600 text-lg ">
              {apm.APM_DATE.split("T")[0]}
            </p>
            <p className="text-blue-800 text-xl font-bold">{apm.CTM_NAME}</p>
            <p className="text-black text-lg">{apm.APMS_STATUSDESCRIPTION}</p>
          </div>
          <div className="flex flex-col flex-1 p-3 ml-4 justify-center items-end">
            <p className="text-blue-800 text-xl font-semibold">
              {apm.APM_TIME.slice(0, 5)}
            </p>
          </div>
        </div>
        <button
          className=" place-self-center mr-3 h-full hover:text-blue-500 hover:scale-105 "
          onClick={() => {
            setMenuOpen(!menuOpen);
            setDenyInput(false);
          }}
        >
          <MoreVertIcon />
        </button>
        <div
          className={` ${
            menuOpen ? "flex right-12" : "hidden"
          } flex-col bg-white p-4 shadow-2xl rounded-xl w-auto absolute mt-4 transition-all ease-in-out`}
        >
          {(() => {
            const srvName: any = [];
            srvList?.forEach((srv, i) => {
              srvName.push(
                <p className="text-slate-600">{i + 1 + " - " + srv.SRV_NAME}</p>
              );
            });
            return srvName;
          })()}

          <div className={`  ${apm.STT_ID==3 ? "hidden" : "flex"}  flex-row space-x-3 py-2 px-4 self-center`}>
            <button
              className="hover:scale-125"
              onClick={() => {
                handleCheck();
              }}
            >
              <CheckIcon
                className={` ${
                  denyInput ? "text-neutral-300" : "text-green-600"
                } `}
              />
            </button>
            <input
              className={` ${
                denyInput ? "w-[150px]" : "hidden w-0"
              } bg-blue-50 rounded-full px-3 transition-all ease-in-out`}
              onChange={(e) => setDenyReason(e.target.value)}
              placeholder="Lí do từ chối"
              type="text"
            />
            <button
              className={` hover:scale-125`}
              onClick={() => {
                denyInput ? handleDeny() : setDenyInput(!denyInput);
              }}
            >
              <CloseIcon
                className={`text-red-600 ${denyInput ? "scale-125" : ""} `}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
