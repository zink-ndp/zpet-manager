import React, { useState } from "react";
import AppointmentsList from "./appointments/AppointmentsList";
import NewAppoinment from "./appointments/NewAppoinment";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

//icon
import AddReactionIcon from "@mui/icons-material/AddReaction";
import RevenueChart from "./analytic/RevenueChart";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs("2023-01-01"));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs("2023-12-31"));

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
          <NewAppoinment />
        </Sheet>
      </Modal>
      <div
        className={`flex lg:flex-row flex-col-reverse w-full rounded-xl justify-center lg:space-x-5 space-y-5 `}
      >
        <div className="flex flex-col p-8 mt-5 lg:mt-4 rounded-xl lg:w-[70%] bg-white shadow-md">
          <p className="text-black font-bold text-2xl">Thống kê</p>
          <div className="w-full flex flex-row space-x-5 mt-4 lg:mt-2 items-center justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Từ ngày"
                value={dateFrom}
                onChange={(newValue) => setDateFrom(newValue)}
              />
              <DatePicker
                label="Đến ngày"
                value={dateTo}
                onChange={(newValue) => setDateTo(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="w-full m-3 p-3">
            <RevenueChart />
          </div>
          <div className="flex flex-col lg:flex-row"></div>
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
              Thêm cuộc hẹn
              <AddReactionIcon className="ml-2" />
            </button>
          </div>
          <AppointmentsList />
        </div>
      </div>
    </>
  );
}
