import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "@mui/joy";
import ReplayIcon from "@mui/icons-material/Replay";
import Voucher from "./Voucher";

export default function VouchersList() {
  const [vouList, setVouList] = useState<Array<any>>();
  const [allVou, setAllVou] = useState<Array<any>>();
  const [error, setError] = useState<string | null>();

  const [search, setSearch] = useState("");

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/vouchers"
      );
      const data: any = await response.data.data;
      setVouList(data);
      setAllVou(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching voucher:", err);
    }
  };

  const searchApi = async (s: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/vouchers/search/${s}`
      );
      const data: any = await response.data.data;
      setVouList(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching vouchers:", err);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (error) {
    return <div>Error fetching vouchers: {error}</div>;
  }

  if (!vouList) {
    return <div>Loading vouchers...</div>;
  }

  function reloadList(): void {
    setVouList(allVou);
  }

  console.log(allVou)

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Input
        placeholder="Tìm kiếm mã, tên, tỉ lệ,... khuyến mãi"
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
        const vouchers: any = [];
        vouList.forEach((vou) => {
          vouchers.push(<Voucher info={vou} />);
        });
        return vouchers;
      })()}
    </div>
  );
}
