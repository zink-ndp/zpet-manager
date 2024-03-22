import React, { useState } from "react";
import { formatMoney } from "@/app/functions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Badge from "@mui/joy/Badge";
import Image from "next/image";
import defaultImg from "./default.png";
import { Modal, ModalClose, Sheet } from "@mui/joy";
import ServiceDetail from "./ServiceDetail";

export default function Service(props: any) {
  const [modalOpen, setModalOpen] = useState(false);

  const service = props.info;

  return (
    <>
      <div className=" bg-blue-100 rounded-xl shadow-md p-5 flex flex-row ">
        <div className="text-blue-700 font-semibold flex flex-row space-x-10 flex-1">
          <Badge badgeContent={ service.SRV_ISAVAILABLE ? "Available" : "Unavailable"} color={ service.SRV_ISAVAILABLE ? "success" : "danger"}>
            <Image alt="srvImg" src={defaultImg} width={50} height={50} />
          </Badge>
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            <p>{service.SRV_NAME}</p>
            <p className="hidden lg:block"> - </p>
            <p className="text-green-700">{formatMoney(service.SRV_PRICE)}</p>
          </div>
        </div>
        <p
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          className=" text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110"
        >
          <BorderColorIcon />
        </p>
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
          <ServiceDetail info={props.info} />
        </Sheet>
      </Modal>
    </>
  );
}
