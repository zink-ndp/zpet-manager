import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/joy/Autocomplete";
import { Checkbox, Input, Textarea } from "@mui/joy";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { apiUrl } from "@/app/utils/apiUrl";

export default function NewAppoinment() {
  const testOption = ["opt1", "opt2", "opt3"];

  const router = useRouter();

  const [isStranger, setIsStranger] = useState(false);
  const [dateTime, setDateTime] = useState<any>();
  const [phone, setPhone] = useState<String | null>("");
  const [cusName, setCusName] = useState<String | null>("");
  const [service, setService] = useState<String[] | any>();
  const [note, setNote] = useState<String | null>("");
  const [btnEnable, setBtnEnable] = useState(false);

  const [cusList, setCusList] = useState<Array<any>>();
  const [srvList, setSrvList] = useState<Array<any>>();

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/customers");
      const data = await response.data.data;
      setCusList(data);
    } catch (error) {}
  };

  const fetchCustomerByPhone = async (p: String) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/customers/info/${p}`);
      const data = await response.data.data;
      setCusName(data[0].CTM_NAME + " - Mã:" + data[0].CTM_ID);
    } catch (error) {}
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/services/");
      const data: any = await response.data.data;
      setSrvList(data);
    } catch (err: any) {}
  };

  useEffect(() => {
    fetchCustomer();
    fetchServices();
  }, []);

  const cusPhoneList: any = [];
  cusList?.forEach((cus) => {
    cusPhoneList.push(cus.CTM_PHONE);
  });

  const srvNameList: any = [];
  srvList?.forEach((srv) => {
    srvNameList.push(srv.SRV_NAME + " - Mã:" + srv.SRV_ID);
  });

  useEffect(() => {
    function checkFormOk() {
      if (isStranger) {
        if (!service || !dateTime) return false;
      } else {
        if (!phone || !cusName || !service || !dateTime) return false;
      }
      return true;
    }
    const isOk = checkFormOk();
    isOk ? setBtnEnable(true) : setBtnEnable(false);
  }, [isStranger, phone, cusName, service, dateTime]);

  function handleAddAppointment() {
    const date = dateTime.$y + "/" + (dateTime.$M + 1) + "/" + dateTime.$D;
    const time = dateTime.$H + ":" + dateTime.$m;
    const cusId = cusName ? cusName.split(":")[1] : null;
    const srvs: string[] = [];
    service.forEach((srv: string) => {
      srvs.push(srv.split(":")[1]);
    });

    const postNewAppointment = async () => {
      try {
        const response = await axios.post(apiUrl + "/api/v1/appointments/", {
          cusId: cusId,
          date: date,
          time: time,
          note: note,
          services: srvs,
        });
        alert("Tạo thành công!");
        router.refresh();
      } catch (error) {
        alert(error);
      }
    };
    postNewAppointment();
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <p className="text-xl font-bold self-center">Thêm lịch hẹn</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          className="w-full h-[45px] mt-7"
          label="Ngày, giờ hẹn"
          disablePast
          onChange={(v: any) => setDateTime(v)}
        />
      </LocalizationProvider>
      <Checkbox
        className="text-xl  font-semi-bold"
        label="Khách vãng lai"
        size="lg"
        checked={isStranger}
        onChange={(e) => {
          setIsStranger(!isStranger);
        }}
      />
      <p className="text-lg ">Số điện thoại</p>
      <Autocomplete
        disabled={isStranger}
        placeholder="Số điện thoại khách hàng"
        options={cusPhoneList}
        value={phone}
        className="w-full h-[50px]"
        freeSolo
        onInputChange={(event, nValue) => {
          setPhone(nValue);
          fetchCustomerByPhone(nValue);
        }}
      />
      <p className="text-lg ">Tên khách hàng</p>
      <Autocomplete
        disabled={isStranger}
        placeholder="Tên khách hàng"
        options={testOption}
        value={cusName}
        className="w-full h-[50px]"
        freeSolo
        onChange={(event, nValue) => {
          setCusName(nValue);
        }}
      />
      <p className="text-lg ">Dịch vụ</p>
      <Autocomplete
        multiple
        placeholder="Dịch vụ"
        limitTags={4}
        size="lg"
        options={srvNameList}
        freeSolo={true}
        getOptionLabel={(option: string) => option}
        onChange={(event, nValue) => {
          setService(nValue);
        }}
        className="w-full h-[50px]"
      />
      <p className="text-lg ">Ghi chú:</p>
      <Input
        className="w-full h-[50px]"
        placeholder="Ghi chú cho cửa hàng…"
        onChange={(e: any) => {
          setNote(e.target.value);
        }}
      />
      <button
        className={`justify-center mt-5 ${
          btnEnable ? "primary-btn" : "primary-disabled-btn"
        } `}
        onClick={(e) => {
          handleAddAppointment();
        }}
      >
        Thêm lịch hẹn
      </button>
    </div>
  );
}
