import React, { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/joy/Autocomplete";
import Checkbox from "@mui/joy/Checkbox";
import { getToday } from "@/app/functions";
import { getSessionData } from "@/app/session/getSession";
import { List, ListDivider, ListItem, Radio, RadioGroup } from "@mui/joy";
import axios from "axios";
import { formatMoney } from "@/app/functions";

export default function MakeInvoice() {
  const testOption = ["opt1", "opt2", "opt3"];
  const today = getToday();

  const [session, setSession] = useState<Array<any> | null>(null);
  const [cusList, setCusList] = useState<Array<any> | null>(null);
  const [cusInfo, setCusInfo] = useState<Array<any> | null>(null);
  const [petList, setPetList] = useState<Array<any> | null>(null);
  const [srvList, setSrvList] = useState<Array<any> | null>(null);

  function resetAll(){
    setPhone('')
    setCusName('')
    setPet('')
    setService([])
    setShipPet(false)
    setAddress('')
    setPrice(0)
    setTotal(0)
    setBtnDisabled(true)
  }

  const [phone, setPhone] = useState<String | null>("");
  const [cusName, setCusName] = useState<String | null>("");
  const [pet, setPet] = useState<String | null>("");
  const [service, setService] = useState<String[] | any>();
  const [shipPet, setShipPet] = useState(false);
  const [address, setAddress] = useState<String | null>("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/customers"
      );
      const data = await response.data.data;
      setCusList(data);
    } catch (error) {}
  };

  const fetchCustomerByPhone = async (p: String) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/customers/info/${p}`
      );
      const data = await response.data.data;
      setCusInfo(data);
    } catch (error) {}
  };

  const fetchPets = async (id: String) => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/customers/" + id + "/pets"
      );
      const data: any = await response.data.data;
      setPetList(data);
    } catch (err: any) {}
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/services/"
      );
      const data: any = await response.data.data;
      setSrvList(data);
    } catch (err: any) {}
  };

  useEffect(() => {
    getSessionData().then((value) => {
      setSession(value);
    });
    fetchCustomers();
    fetchServices();
  }, []);

  const staffName = session ? session[0].STF_NAME : "";
  const staffId = session ? session[0].STF_ID : "";

  const nameList: any = [];
  const phoneList: any = [];
  cusList?.forEach((cus) => {
    nameList.push(cus.CTM_NAME + " - Mã:" + cus.CTM_ID);
    phoneList.push(cus.CTM_PHONE);
  });

  useEffect(() => {
    if (phone?.length == 10) fetchCustomerByPhone(phone);
  }, [phone]);

  useEffect(() => {
    if (cusInfo) {
      setCusName(cusInfo[0].CTM_NAME + " - Mã:" + cusInfo[0].CTM_ID);
      fetchPets(cusInfo[0].CTM_ID);
    }
  }, [cusInfo]);

  useEffect(() => {
    setPrice(0);
    service?.forEach((srv: String) => {
      srvList?.forEach((s) => {
        const s_name = s.SRV_NAME;
        if (s_name == srv.split("-")[0]) {
          setPrice(price + s.SRV_PRICE);
        }
      });
    });
  }, [service]);

  useEffect(()=>{
    setTotal(price)
  },[price])

  useEffect(() => {
    if (!cusName || !pet || !service) setBtnDisabled(true);
    else setBtnDisabled(false);
  }, [cusName, pet, service]);

  const petNameList: any = [];
  petList?.forEach((pet) => {
    petNameList.push(pet.P_NAME + "-Mã:" + pet.P_ID);
  });

  const srvNameList: any = [];
  srvList?.forEach((srv) => {
    srvNameList.push(srv.SRV_NAME + "-Mã:" + srv.SRV_ID);
  });

  function handleMakeInvoice() {
    if (session && cusName && pet && phone && service) {
      const today = new Date();
      const time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        " - " +
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      const stfId = session[0]!.STF_ID;
      const cusId = cusName?.split(":")[1];
      const petId = pet.split(":")[1];
      const srvId: Array<string> = [];
      service.forEach((srv: string) => {
        const id = srv.split(":")[1].toString();
        srvId.push(id);
      });
      const tt = total
      console.log(time, stfId, cusId, petId, srvId, tt);
      resetAll()
    } else console.log("Chua du thong tin");
  }

  return (
    <>
      <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
        <p className="text-2xl font-bold">Lập hoá đơn</p>
        <p className="text-lg mt-4">
          Ngày lập: <p className="font-bold">{today}</p>
        </p>
        <p className="text-lg mt-4">
          Nhân viên:{" "}
          <p className="font-bold">
            {staffName} - Mã NV: {staffId}
          </p>
        </p>
        <p className="text-lg mt-4">Số điện thoại</p>
        <Autocomplete
          placeholder="Số điện thoại khách hàng"
          options={phoneList}
          value={phone}
          className="w-full h-[50px]"
          onInputChange={(e, nValue) => {
            setPhone(nValue);
          }}
        />
        <p className="text-lg mt-4">Tên khách hàng</p>
        <Autocomplete
          placeholder="Tên khách hàng"
          options={nameList}
          className="w-full h-[50px]"
          value={cusName}
          onInputChange={(e, nValue) => {
            setCusName(nValue);
          }}
        />
        <p className="text-lg mt-4">Thú cưng</p>
        <Autocomplete
          disabled={petList ? false : true}
          placeholder="Thú cưng của Khách hàng"
          options={petNameList}
          className="w-full h-[50px]"
          value={pet}
          onInputChange={(e, nValue) => {
            setPet(nValue);
          }}
        />
        <p className="text-lg mt-4">Dịch vụ</p>
        <Autocomplete
          multiple
          placeholder="Dịch vụ"
          limitTags={4}
          size="lg"
          options={srvNameList}
          getOptionLabel={(option: string) => option}
          onChange={(event, nValue) => {
            setService(nValue);
          }}
          className="w-full h-[50px]"
        />

        <p className="text-lg mt-4">
          Đơn giá dịch vụ tạm tính:{" "}
          <p className="font-bold">{formatMoney(price)}</p>
        </p>
        <Checkbox
          className="text-xl mt-4 font-semi-bold"
          label="Áp dụng giao thú cưng tận nhà:"
          size="lg"
          checked={shipPet}
          onChange={(e) => {
            setShipPet(!shipPet);
          }}
        />
        {shipPet && (
          <div>
            <p className="text-lg mt-4">Địa chỉ:</p>
            <Autocomplete
              placeholder="Địa chỉ"
              options={testOption}
              className="w-full h-[50px]"
            />
            <p className="text-md mt-2">Phí vận chuyển: {price}đ</p>
          </div>
        )}

        {/* {(() => {
          if (price)
            return (
              <>
                <p className="text-lg mt-4">Hình thức thanh toán:</p>
                <RadioGroup
                  aria-labelledby="example-payment-channel-label"
                  overlay
                  name="example-payment-channel"
                  defaultValue="Paypal"
                >
                  <List
                    component="div"
                    variant="outlined"
                    orientation={"vertical"}
                    sx={{
                      borderRadius: "sm",
                      boxShadow: "sm",
                    }}
                  >
                    {["Tiền mặt", "QR Code"].map((value, index) => (
                      <React.Fragment key={value}>
                        {index !== 0 && <ListDivider />}
                        <ListItem>
                          <Radio
                            id={value}
                            value={value}
                            label={value}
                            onChange={() => setPayment(value)}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </RadioGroup>
              </>
            );
        })()} */}

        <ListDivider sx={{ marginTop: "15px" }} />
        <p className="text-xl mt-4">
          Tổng tiền phải thanh toán: <p className="font-bold">{formatMoney(total)}</p>
        </p>

        <button
          disabled={btnDisabled}
          className="mt-4 primary-btn disabled:primary-disabled-btn"
          onClick={(e) => {
            handleMakeInvoice();
          }}
        >
          Lập hoá đơn
        </button>
      </div>
    </>
  );
}
