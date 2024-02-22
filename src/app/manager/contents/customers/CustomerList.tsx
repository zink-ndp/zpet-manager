import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "postcss/lib/list";
import Customer from "./Customer";
import { Button, Input } from "@mui/joy";
import ReplayIcon from "@mui/icons-material/Replay";

export default function CustommerList() {
  const [cusList, setCusList] = useState<Array<any>>();
  const [allCus, setAllCus] = useState<Array<any>>();
  const [error, setError] = useState<string | null>();

  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/customers"
      );
      const data: any = await response.data.data;
      setCusList(data);
      setAllCus(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  };

  const searchApi = async (s: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/customers/search/${s}`
      );
      const data: any = await response.data.data;
      setCusList(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching pets:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (error) {
    return <div>Error fetching customers: {error}</div>;
  }

  if (!cusList) {
    return <div>Loading customers...</div>;
  }

  function reloadList(): void {
    setCusList(allCus);
  }

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Input
        placeholder="Tìm kiếm tên, loại, mã Khách hàng"
        color="neutral"
        size="lg"
        variant="outlined"
        sx={{ "--Input-focused": 1 }}
        onChange={(e: any) => {
          setSearch(e.target.value);
          searchApi(e.target.value);
        }}
        className={` rounded-full self-end w-full lg:w-[30%] h-[40px] p-4 items-center mb-3`}
        endDecorator={
          <Button
            className="text-blue-500 hover:scale-110 rounded-full space-x-2"
            onClick={() => reloadList()}
            variant="solid"
          >
            <p  className="hidden lg:block">Load lại DS</p>
            <ReplayIcon />
          </Button>
        }
      />
      {(() => {
        const cus: any = [];
        cusList.forEach((customer) => {
          cus.push(<Customer info={customer} />);
        });
        return cus;
      })()}
    </div>
  );
}
