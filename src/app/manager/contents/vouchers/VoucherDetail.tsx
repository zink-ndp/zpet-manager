import { apiUrl } from "@/app/utils/apiUrl";
import { Button } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VoucherDetail(props: any) {
  const voucher = props.info;
  const id = voucher.VOU_ID;

  const [services, setServices] = useState<Array<any>>();
  const fetchServices = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/services");
      const data: any = await response.data.data;
      setServices(data);
    } catch (err: any) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const srvNameList: Array<string> = [];
  let forService: string = "";
  services &&
    services.forEach((srv) => {
      srvNameList.push(srv.SRV_NAME + " - Mã:" + srv.SRV_ID);
      if (srv.SRV_ID == id) forService = srv.SRV_NAME + " - Mã:" + srv.SRV_ID;
    });

  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const [forSrv, setForSrv] = useState(forService);
  const [name, setName] = useState(voucher.VOU_NAME);
  const [des, setDes] = useState(voucher.VOU_DESCRIPTION);
  const [percent, setPercent] = useState(voucher.VOU_PERCENT);
  const [exPrice, setExPrice] = useState(voucher.VOU_EXCHANGEPRICE);
  const [available, setAvailable] = useState(voucher.VOU_ISAVAILABLE);

  function setDefault() {
    setName(voucher.VOU_NAME);
    setDes(voucher.VOU_DESCRIPTION);
    setPercent(voucher.VOU_PERCENT);
    setExPrice(voucher.VOU_EXCHANGEPRICE);
    setAvailable(voucher.VOU_ISAVAILABLE);
    setIsInfoChanged(false);
  }

  async function handleUpdate() {
    console.log(
      id,
      name,
      forSrv.split(":")[1],
      des,
      percent,
      exPrice,
      available
    );
    try {
      const response = await axios.put(apiUrl + "/api/v1/vouchers/" + id, {
        name: name,
        des: des,
        srv: parseInt(forSrv.split(":")[1]),
        percent: parseFloat(percent),
        price: parseInt(exPrice),
        stt: available,
      });
      alert("Cập nhật thành công!");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-black font-bold text-lg">Thông tin Voucher</p>
      <p className="text-black text-lg">
        Mã Vocher
        <span className="italic text-slate-500 text-sm"> (Không thay đổi)</span>
      </p>
      <input
        className="input-form border-slate-300 text-slate-500"
        type="text"
        disabled
        value={voucher.VOU_ID}
      />

      <p className="text-black text-lg">Áp dụng cho: </p>
      <select
        name="srv"
        id=""
        className="input-form border-slate-300 text-black"
        onChange={(e) => {
          setForSrv(e.target.value);
          setIsInfoChanged(true);
        }}
      >
        {(() => {
          const srvOptions: any = [];
          services &&
            services.forEach((srv) => {
              srvOptions.push(
                <option selected={srv.SRV_ID == id} value={srv.SRV_ID}>
                  {srv.SRV_NAME + " - Mã:" + srv.SRV_ID}
                </option>
              );
            });
          return srvOptions;
        })()}
      </select>

      <p className="text-black text-lg">Tên Voucher:</p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setIsInfoChanged(true);
        }}
      />
      <p className="text-black text-lg">Mô tả:</p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={des}
        onChange={(e) => {
          setDes(e.target.value);
          setIsInfoChanged(true);
        }}
      />
      <p className="text-black text-lg">Tỉ lệ:</p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={percent}
        onChange={(e) => {
          setPercent(e.target.value);
          setIsInfoChanged(true);
        }}
      />
      <p className="text-black text-lg">Điểm quy đổi:</p>
      <input
        className="input-form border-slate-300 text-black"
        type="text"
        value={exPrice}
        onChange={(e) => {
          setExPrice(e.target.value);
          setIsInfoChanged(true);
        }}
      />

      <p className="text-black text-lg">Trạng thái: </p>
      <select
        name="stt"
        id=""
        className="input-form border-slate-300 text-black"
        onChange={(e) => {
          setAvailable(parseInt(e.target.value));
          setIsInfoChanged(true);
        }}
      >
        <option selected={!available} value="0">
          Không hoạt động
        </option>
        <option selected={available} value="1">
          Hoạt động
        </option>
      </select>

      <Button
        variant="plain"
        className="mt-5 p-3 rounded-xl"
        onClick={() => setDefault()}
      >
        Đặt lại thông tin
      </Button>

      <Button
        className="primary-btn disabled:primary-disabled-btn"
        disabled={!isInfoChanged}
        onClick={() => {
          handleUpdate();
        }}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
}
