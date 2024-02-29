import axios from "axios";
import React, { useEffect, useState } from "react";
import { convertDateToUTC } from "@/app/functions";

export default function AppointmentDetail(props: any) {
  const apm = props.info;
  const srvName = props.srvName;

  const [sttList, setSttList] = useState<Array<any>>();

  const fetchStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/appointments/status/list/${apm.APM_ID}`
      );
      const data = await response.data.data;
      setSttList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-blue-600 font-semibold text-xl">
        Mã lịch hẹn: {apm.APM_ID} - KH: {apm.CTM_NAME}
      </p>
      <p className="text-blue-600 font-semibold text-xl">
        Ghi chú:{" "}
        <span className="text-slate-800 font-normal text-base">
          {apm.APM_NOTE}
        </span>
      </p>
      <p className="text-blue-600 font-semibold text-xl">
        Các dịch vụ hẹn trước:
      </p>
      <div className="flex flex-col h-auto ml-8">{srvName}</div>
      <p className="text-blue-600 font-semibold text-xl">Lịch sử trạng thái:</p>
      <div className="flex flex-col ml-8">
        {(() => {
          const sttElements: any = [];
          sttList?.forEach((stt: any) => {
            sttElements.push(
              <span className="text-slate-800 font-normal text-base">
                {convertDateToUTC(stt.ATTIME)} - {stt.STT_NAME} -{" "}
                {stt.APMS_STATUSDESCRIPTION}
              </span>
            );
          });
          return sttElements;
        })()}
      </div>
    </div>
  );
}
