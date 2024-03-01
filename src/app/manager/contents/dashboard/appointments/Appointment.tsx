import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import { Modal, ModalClose, Sheet } from "@mui/joy";
import axios from "axios";
import { convertDateToUTC } from "@/app/functions";
import AppointmentDetail from "./AppointmentDetail";

export default function Appointment(props: any) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [denyInput, setDenyInput] = useState(false);
  const [denyReason, setDenyReason] = useState("");

  const [srvList, setSrvList] = useState<Array<any>>();

  const [modalOpen, setModalOpen] = useState(false);

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

  const putAppointmentStt = async (sttId: number, sttDescription: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3100/api/v1/appointments/status/${apm.APM_ID}`,
        {
          sttId: sttId,
          sttDescription: sttDescription,
        }
      );
    } catch (error) {
      return;
    }
  };

  function handleDeny() {
    putAppointmentStt(4, denyReason);
    alert("Đã từ chối lịch hẹn");
    setMenuOpen(false);
    setDenyInput(false);
    router.refresh();
  }

  function handleCheck() {
    switch (apm.STT_ID) {
      case 1:
        putAppointmentStt(2, "Lịch hẹn đã được xác nhận");
        alert("Đã xác nhận lịch hẹn");
        setMenuOpen(false);
        setDenyInput(false);
        router.refresh();
        break;

      case 2:
        putAppointmentStt(3, "Lịch hẹn đã hoàn thành");
        alert("Đã hoàn thành lịch hẹn");
        setMenuOpen(false);
        setDenyInput(false);
        router.refresh();
        break;

      default:
        break;
    }
  }

  const srvName: any = [];
  srvList?.forEach((srv, i) => {
    srvName.push(
      <p className="text-slate-600">{i + 1 + " - " + srv.SRV_NAME}</p>
    );
  });

  return (
    <>
      <div className="bg-blue-100 mt-3 w-full h-[100px] justify-center rounded-2xl flex flex-row group hover:scale-105 transition-all ease-in-out">
        <Image
          className=" rounded-2xl object-cover h-[90px] w-[90px] shadow-lg"
          src="https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avt"
          height={100}
          width={100}
        />
        <div className="flex flex-row flex-1 w-full content-between ">
          <div className="flex flex-col p-3 ml-4 justify-center">
            <p className="text-blue-600 text-lg ">
              {convertDateToUTC(apm.APM_DATE).split(" ")[0]}
            </p>
            <p className="text-blue-800 text-xl font-bold">{apm.CTM_NAME}</p>
            {/* <p className="text-black text-lg">{apm.APMS_STATUSDESCRIPTION}</p> */}
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
          {srvName}

          <div className={`flex flex-row space-x-3 py-2 px-4 self-center`}>
            <button
              className={` ${
                denyInput ? "text-neutral-300 cursor-not-allowed" : "text-blue-600 hover:scale-125"
              } `}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <PageviewOutlinedIcon />
            </button>
            <button
              className={`  ${
                apm.STT_ID == 3 || apm.STT_ID == 4 ? "hidden" : "block"
              } hover:scale-125`}
              onClick={() => {
                handleCheck();
              }}
            >
              <CheckIcon
                className={` ${
                  denyInput ? "text-neutral-300 cursor-not-allowed" : "text-green-600"
                } `}
              />
            </button>
            <input
              className={`  ${
                denyInput ? "w-[150px]" : "hidden w-0"
              } bg-blue-100 rounded-full px-3 py-2 transition-all ease-in-out`}
              onChange={(e) => setDenyReason(e.target.value)}
              placeholder="Lí do từ chối"
              type="text"
            />
            <button
              className={` ${
                apm.STT_ID == 3 || apm.STT_ID == 4 ? "hidden" : "block"
              } hover:scale-125`}
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
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: { sm: 0.8, lg: 0.5 },
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <AppointmentDetail info={apm} srvName={srvName} />
        </Sheet>
      </Modal>
    </>
  );
}
