import { apiUrl } from "@/app/utils/apiUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatMoney } from "@/app/functions";

export default function InvoiceDetail(props: any) {
  const [invInfo, setInvInfo] = useState<Array<any>>([]);
  const [invDetail, setInvDetail] = useState<Array<any>>([]);

  var total = 0;

  const fetchInvDetail = async (id: number) => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/invoices/" + id);
      const info: any = await response.data.info;
      const detail: any = await response.data.detail;
      setInvInfo(info);
      setInvDetail(detail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvDetail(props.info.INV_ID);
  }, []);

  return (
    <div className="flex flex-row space-x-4 p-4 rounded-xl bg-blue-100 text-black items-center">
      <div className="flex flex-col p-2">
        <p className="text-xl font-bold mt-1 self-center ">Chi tiết hoá đơn</p>
        <p>
          Mã hoá đơn: <span className="font-bold">{props.info.INV_ID}</span> -
          Nhân viên: <span className="font-bold">{props.info.STF_NAME}</span>
        </p>
        <p>
          Xuất hoá đơn lúc:{" "}
          <span className="font-bold">{props.info.INV_CREATEDAT}</span>
        </p>
        <p className="font-bold">Danh sách dịch vụ:</p>
        <table className="  border-collapse border-slate-500 py-3">
          <tr>
            <th>STT</th>
            <th>Dịch vụ</th>
            <th>Giá</th>
          </tr>
          {(() => {
            const srvRow: any = [];
            invDetail &&
              invDetail.forEach((inv, i) => {
                total += inv.SRV_PRICE;
                srvRow.push(
                  <tr>
                    <td>{i + 1}</td>
                    <td>{inv.SRV_NAME}</td>
                    <td>{formatMoney(inv.SRV_PRICE)}</td>
                  </tr>
                );
              });
            return srvRow;
          })()}
        </table>
        <div className="float-end self-end text-end">
          <p>Voucher: Không</p>
          <p>Giá giảm: 0d</p>
          <p className=" font-bold">Thành tiền {formatMoney(total)}</p>
          <p className=" font-bold">Tích luỹ {Math.floor(total*0.001)}</p>
        </div>
      </div>
    </div>
  );
}
