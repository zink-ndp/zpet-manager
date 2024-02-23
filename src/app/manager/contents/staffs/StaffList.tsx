import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "@mui/joy";
import ReplayIcon from "@mui/icons-material/Replay";
import Staff from "./Staff";

export default function StaffList() {
  const [staffList, setStaffList] = useState<Array<any>>();
  const [allStaff, setAllStaff] = useState<Array<any>>();
  const [error, setError] = useState<string | null>();

  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/staffs"
      );
      const data: any = await response.data.data;
      setStaffList(data);
      setAllStaff(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching staffs:", err);
    }
  };

  const searchApi = async (s: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/staffs/search/${s}`
      );
      const data: any = await response.data.data;
      setStaffList(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching staffs:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (error) {
    return <div>Error fetching staffs: {error}</div>;
  }

  if (!staffList) {
    return <div>Loading staffs...</div>;
  }

  function reloadList(): void {
    setStaffList(allStaff);
  }

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Input
        placeholder="Tìm kiếm tên, loại, mã Nhân viên"
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
        const staffs: any = [];
        staffList.forEach((staff) => {
          staffs.push(<Staff info={staff} />);
        });
        return staffs;
      })()}
    </div>
  );
}
