import React, { useState } from "react";
import Image from "next/image";
import defaultImg from "./default.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { formatMoney } from "@/app/functions";
import InvoiceDetail from "./InvoiceDetail";
import axios from "axios";
import { apiUrl } from "@/app/utils/apiUrl";

export default function Invoice(props: any) {
  const invoice = props.info;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
          <InvoiceDetail info={invoice}/>
      </Modal>
      <div className=" bg-blue-100 rounded-xl shadow-md p-5 flex flex-row items-center">
        <div className="text-blue-700 font-semibold flex flex-row space-x-4 flex-1">
          <div className="h-[50px] w-[50px] flex justify-center items-center">
            <Image alt="srvImg" src={defaultImg} width={100} height={100} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row lg:space-x-3">
              <p className="text-blue-600">{invoice.INV_CREATEDAT}</p>
              <p className="text-blue-600">
                <span className="text-black">
                  Khách hàng: {invoice.CTM_NAME}
                </span>
              </p>
            </div>
            <p className="text-blue-600">
              <span className="text-green-600">
                Tổng tiền: {formatMoney(invoice.INV_TOTAL)}
              </span>
            </p>
          </div>
        </div>
        <p
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          className=" text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110"
        >
          <MoreVertIcon />
        </p>
      </div>
    </>
  );
}
