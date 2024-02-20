import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

var date_format = require("date-format");

export default function CustomerDetail(props: any) {
  const [petsList, setPetsList] = useState<Array<any>>();
  const [error, setError] = useState<string | null>();

  const fetchPetsList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/customers/"+props.info.CTM_ID+"/pets"
      );
      const data: any = await response.data.data;
      setPetsList(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchPetsList();
  }, []);

  return (
    <div className=" p-5 flex flex-col justify-center items-center">
      <div className="flex flex-row w-full">
        <p className="flex-1 font-semibold text-black text-lg">
          <span className="text-blue-700">Tên KH: </span>
          {props.info.CTM_NAME}
        </p>
        <p className="flex-1 font-semibold text-black text-lg">
          <span className="text-blue-700">Số điện thoại: </span>
          {props.info.CTM_PHONE}
        </p>
      </div>
      <div className="flex flex-row w-full">
        <p className="flex-1 font-semibold text-black text-lg">
          <span className="text-blue-700">Tham gia: </span>
          {date_format("dd/MM/yyyy", new Date(props.info.CTM_CREATEAT))}
        </p>
        <p className="flex-1 font-semibold text-black text-lg">
          <span className="text-blue-700">Trạng thái: </span>
          {props.info.CTM_ISACTIVE ? "Hoạt động" : "Ngưng hoạt động"}
        </p>
      </div>
      <p className="text-blue-700 font-bold text-xl my-4">Chủ của thú cưng</p>
      <div className="flex flex-col">
        {(()=>{
            if (error) {
                return <div>Error fetching customers: {error}</div>
              }
        })()}
        {(()=>{
            if (!petsList) {
              return <div>Loading customers...</div>;
            } else {
                const pet: any = []
                petsList.forEach((p,i)=>{
                    pet.push(
                        <p className="text-lg text-black hover:text-blue-500 hover:scale-110 cursor-pointer">
                            {(i+1)+" - "+p.PT_NAME+" "+p.P_SPECIE+" "+p.P_NAME+" - ID: "+p.P_ID}
                        </p>
                    )
                })
                return pet
            }
        })()}
      </div>
      <p className="text-blue-700 font-bold text-xl my-4">Lịch sử mua hàng</p>
    </div>
  );
}
