import { apiUrl } from "@/app/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Appointment from "../dashboard/appointments/Appointment";

export default function AppointmentsListByStatus(props: any) {
  const status = props.status;

  const [apmList, setApmList] = useState<Array<any>>();

  let sttName = "";

  switch (status) {
    case 1:
      sttName = "Đợi xác nhận";
      break;
    case 2:
      sttName = "Đã xác nhận";
      break;
    case 3:
      sttName = "Đã hoàn thành";
      break;
    case 4:
      sttName = "Đã huỷ";
      break;
    default:
      break;
  }

  const fetchAppointmentByStt = async (id: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/appointments/status/${id}`
      );
      const data = await response.data.data;
      setApmList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAppointmentByStt(status);
  }, []);

  return (
    <div className=" p-4 bg-blue-200 rounded-xl shadow-xl">
      <div className="flex flex-col space-y-5">
        <p className="text-blue-500 font-semibold text-xl self-center">{sttName}</p>
        {(() => {
          const appointment: any = [];
          if (apmList?.length != 0) {
            apmList?.forEach((apm) => {
              appointment.push(<Appointment info={apm} />);
            });
          } else {
            appointment.push(
              <div className="w-full h-full flex justify-center items-center mt-7">
                <p className="text-slate-700 self-center text-2xl">
                  Không có lịch hẹn nào
                </p>
              </div>
            );
          }
          return appointment;
        })()}
      </div>
    </div>
  );
}
