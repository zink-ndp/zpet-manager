import React, { useState } from "react";
import AppointmentsListByStatus from "./AppointmentsListByStatus";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NewAppoinment from "../dashboard/appointments/NewAppoinment";
import { Button, Modal, ModalClose, Sheet } from "@mui/joy";

export default function Appointments() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row space-x-4">
          <p className="text-2xl font-bold">Lịch hẹn</p>
          <Button
            variant="outlined"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <p className="hidden lg:block">Thêm lịch hẹn</p>
            <AddOutlinedIcon className="text-sm" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-3 mt-3">
        <div className="flex-1 ">
          <AppointmentsListByStatus status={1} />
        </div>
        <div className="flex-1 ">
          <AppointmentsListByStatus status={2} />
        </div>
        <div className="flex-1 ">
          <AppointmentsListByStatus status={3} />
        </div>
        <div className="flex-1 ">
          <AppointmentsListByStatus status={4} />
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
          <NewAppoinment />
        </Sheet>
      </Modal>
    </>
  );
}
