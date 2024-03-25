import { apiUrl } from "@/app/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InvoiceDetail from "../invoices/InvoiceDetail";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { formatMoney } from "@/app/functions";

export default function StaffInvoices(props: any) {
  const staff = props.info;
  
  const [invsList, setInvsList] = useState<Array<any>>();
  const [invToModal, setInvToModal] = useState();
  const [modalOpenInv, setModalOpenInv] = useState(false);


  const fetchInvoices = async () => {
    try {
      const response = await axios.get(
        apiUrl + "/api/v1/staffs/" + staff.STF_ID + "/invoices"
      );
      const data: any = await response.data.data;
      setInvsList(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    fetchInvoices()
  },[])

  return (
    <>
      <div className=" flex flex-col">
        <p className="text-black font-semi-bold text-lg">
            <span className="text-blue-500 font-bold">Nhân viên: </span>
            {staff.STF_NAME}
            <span className="text-blue-500 font-bold"> - Mã: </span>
            {staff.STF_ID}
        </p>
        <p className="text-lg font-bold text-blue-500">Hoá đơn đã lập:</p>
        {(() => {
            const invs: any = [];
            if (invsList?.length == 0) return (
              <p className="text-black italic">Chưa có hoá đơn nào</p>
            )
            invsList?.forEach((i, idx) => {
              invs.push(
                <p
                  onClick={() => {
                    setInvToModal(i);
                    setModalOpenInv(!modalOpenInv);
                  }}
                  className="text-black text-lg cursor-pointer ml-3 hover:scale-105 hover:text-blue-500"
                >
                  {idx +
                    1 +
                    " - Mã hoá đơn:" +
                    i.INV_ID +
                    ": - " +
                    i.INV_CREATEDAT +
                    " - Tổng tiền:" +
                    formatMoney(i.INV_TOTAL)}
                </p>
              );
            });
            return invs;
          })()}
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpenInv}
        onClose={() => setModalOpenInv(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <InvoiceDetail info={invToModal} />
      </Modal>
    </>
  )
}
