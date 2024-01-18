import React, { useState } from "react";
import AppointmentsList from "./appointments/AppointmentsList";
import NewAppoinment from "./appointments/NewAppoinment";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";

export default function Dashboard() {
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
            minWidth: {sm: 0.8, lg: 0.5},
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <NewAppoinment/>
        </Sheet>
      </Modal>
      <div
        className={`flex lg:flex-row flex-col-reverse w-full rounded-xl justify-center lg:space-x-5 space-y-5 `}
      >
        <div className="flex flex-col p-8 mt-5 lg:mt-0 rounded-xl lg:w-[70%] bg-white shadow-md">
          <p className="text-black font-bold text-2xl">Thống kê</p>
        </div>
        <div className="flex flex-col p-8 rounded-xl lg:w-[30%] bg-white shadow-md">
          <div className="flex flex-row justify-between">
            <p className="text-black font-bold text-2xl">Lịch hẹn</p>
            <button
              className="link-btn items-center"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Thêm cuộc hẹn
            </button>
          </div>
          <AppointmentsList />
        </div>
      </div>
    </>
  );
}
