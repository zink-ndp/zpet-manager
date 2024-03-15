import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import PetDetail from "../pets/PetDetail";
import { apiUrl } from "@/app/utils/apiUrl";
import { formatMoney } from "@/app/functions";

var date_format = require("date-format");

export default function CustomerDetail(props: any) {
  const [petsList, setPetsList] = useState<Array<any>>();
  const [invsList, setInvsList] = useState<Array<any>>();
  const [error, setError] = useState<string | null>();

  const [modalOpen, setModalOpen] = useState(false);
  const [petIdModal, setPetIdModal] = useState(0);
  const [mainImg, setMainImg] = useState();

  const fetchPetsList = async () => {
    try {
      const response = await axios.get(
        apiUrl+"/api/v1/customers/" + props.info.CTM_ID + "/pets"
      );
      const data: any = await response.data.data;
      setPetsList(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  };

  async function fetchPetsMainImg(id: number) {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/pets/${id}/mainImg`
      );
      const linkImg: any = await response.data.data[0].PIMG_LINK;
      const srcImg: any = await require(`../pets/pet-images/${linkImg}`);
      setMainImg(srcImg);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  }

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(
        apiUrl+"/api/v1/customers/" +
          props.info.CTM_ID +
          "/invoices"
      );
      const data: any = await response.data.data;
      setInvsList(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPetsList();
    fetchInvoices();
  }, []);

  return (
    <>
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
          <PetDetail id={petIdModal} mainImg={mainImg} />
        </Sheet>
      </Modal>
      <div className=" p-5 flex flex-col justify-center items-center">
        <div className="flex flex-row w-full">
          <p className="flex-1 font-semibold text-black text-lg">
            <span className="text-blue-700">Tên KH: </span>
            {props.info.CTM_NAME}
          </p>
          <p className="flex-1 font-semibold text-black text-lg">
            <span className="text-blue-700">Số điện thoại: </span>
            {props.info.CTM_PHONE}
          </p>
        </div>
        <div className="flex flex-row w-full">
          <p className="flex-1 font-semibold text-black text-lg">
            <span className="text-blue-700">Tham gia: </span>
            {date_format("dd/MM/yyyy", new Date(props.info.CTM_CREATEAT))}
          </p>
          <p className="flex-1 font-semibold text-black text-lg">
            <span className="text-blue-700">Trạng thái: </span>
            {props.info.CTM_ISACTIVE ? "Hoạt động" : "Chưa có tài khoản"}
          </p>
        </div>
        <p className="text-blue-700 font-bold text-xl my-4">Chủ của thú cưng</p>
        <div className="flex flex-col">
          {(() => {
            if (error) {
              return <div>Error fetching pets: {error}</div>;
            }
          })()}
          {(() => {
            if (!petsList) {
              return <div>Loading pets...</div>;
            } else {
              const pet: any = [];
              petsList.forEach((p, i) => {
                pet.push(
                  <div
                    className="text-lg text-black hover:text-blue-500 hover:scale-110 cursor-pointer"
                    onClick={() => {
                      setPetIdModal(p.P_ID);
                      fetchPetsMainImg(p.P_ID);
                      setModalOpen(!modalOpen);
                    }}
                  >
                    <p>
                      {i +
                        1 +
                        " - " +
                        p.PT_NAME +
                        " " +
                        p.P_SPECIE +
                        " " +
                        p.P_NAME +
                        " - ID: " +
                        p.P_ID}
                    </p>
                  </div>
                );
              });
              return pet;
            }
          })()}
        </div>
        <p className="text-blue-700 font-bold text-xl my-4">Lịch sử hoá đơn</p>
        <p className="text-slate-500 italic text-lg">
          {(()=>{
            const invs: any = []
            invsList?.forEach((i, idx)=>{
              invs.push(
                <p className="text-black text-lg">
                  {(idx+1)+" - Mã hoá đơn:"+i.INV_ID+": - "+i.INV_CREATEDAT+" - Tổng tiền:"+formatMoney(i.INV_TOTAL)}
                </p>
              )
            })
            return invs
          })()}
        </p>
      </div>
    </>
  );
}
