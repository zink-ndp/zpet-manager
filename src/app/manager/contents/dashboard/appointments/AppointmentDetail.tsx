import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AppointmentDetail(props: any) {
  const apm = props.info;
  const srvName = props.srvName;

  const [srvList, setSrvList] = useState<Array<any>>();

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

  return (
    <div className="flex flex-col">
      <p className="text-blue-600 font-semibold text-xl">
        Mã lịch hẹn: {apm.APM_ID}
      </p>
      <p className="text-blue-600 font-semibold text-xl">
        Các dịch vụ hẹn trước:
      </p>
      <div className="flex flex-col h-auto ml-8">{srvName}</div>
      <p className="text-blue-600 font-semibold text-xl">Lịch sử trạng thái:</p>
    </div>
  );
}
