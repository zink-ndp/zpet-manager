import React, { useState } from "react";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import PetDetail from "./PetDetail";

export default function Pet() {
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
          <PetDetail />
        </Sheet>
      </Modal>
      <div className="flex flex-row space-x-4 rounded-xl bg-blue-50 items-center">
        <Image
          className=" object-cover h-[80px] w-[80px] rounded-xl shadow-lg"
          src="https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avt"
          height={80}
          width={80}
        />
        <div className="flex flex-row content-center w-full">
          <div className="flex flex-col flex-1 py-3">
            <p className="text-blue-800 font-bold text-lg">
              Chó Corgi - Bảnh tỏn
            </p>
          </div>
          <div className="hidden lg:flex flex-col flex-1 py-3 items-end justify-center">
            <p className="hidden lg:block text-black mr-10 hover:text-blue-500 cursor-pointer"
               onClick={()=>{setModalOpen(!modalOpen)}}>Xem chi tiết</p>
          </div>
          <p className="block lg:hidden self-center mr-5 hover:text-blue-500">
            <button
              onClick={()=>{setModalOpen(!modalOpen)}}>
              <MoreVertIcon />
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
