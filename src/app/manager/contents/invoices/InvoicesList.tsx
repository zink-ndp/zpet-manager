import { Button, Input } from "@mui/joy";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import Invoice from "./Invoice";
import { debounce } from "@/app/functions";

export default function InvoicesList() {
  const [invsList, setInvsList] = useState<Array<any>>();
  const [allInvs, setAllInvs] = useState<Array<any>>();
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/v1/invoices");
      const data: any = await response.data.data;
      setInvsList(data);
      setAllInvs(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching pets:", err);
    }
  };
  const searchApi = async (s: string) => {
    if (s != '') {
      try {
        const response = await axios.get(
          `http://localhost:3100/api/v1/invoices/search/${s}`
        );
        const data: any = await response.data.data;
        setInvsList(data);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching invoice:", err);
      }
    } else {
      fetchInvoices()
    }
  };

  const debounceSearch = debounce(searchApi, 500);

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (error) {
    return <div>Error fetching invoices: {error}</div>;
  }

  if (!invsList) {
    return <div>Loading invoices...</div>;
  }

  function reloadList(): void {
    setInvsList(allInvs);
  }

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Input
        placeholder="Tìm kiếm mã, ngày lập, ... hoá đơn"
        color="neutral"
        size="lg"
        variant="outlined"
        sx={{ "--Input-focused": 1 }}
        onChange={(e: any) => {
          debounceSearch(e.target.value);
        }}
        className={` rounded-full self-end w-full lg:w-[30%] h-[40px] p-4 items-center mb-3`}
        endDecorator={
          <Button
            className="text-blue-500 hover:scale-110 rounded-full space-x-2"
            onClick={() => reloadList()}
            variant="solid"
          >
            <p className="hidden lg:block">Load lại DS</p>
            <ReplayIcon />
          </Button>
        }
      />
      {(() => {
        var inv: any = [];
        if (invsList) {
          invsList.forEach((i) => {
            inv.push(<Invoice info={i} />);
          });
        }
        return inv;
      })()}
    </div>
  );
}
