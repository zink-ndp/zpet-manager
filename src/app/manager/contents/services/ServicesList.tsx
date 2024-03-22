import { Button, Input } from '@mui/joy';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReplayIcon from "@mui/icons-material/Replay";
import Service from './Service';
import { apiUrl } from "@/app/utils/apiUrl";



export default function ServicesList() {
    const [srvList, setSrvList] = useState<Array<any>>();
    const [allSrv, setAllSrv] = useState<Array<any>>(); 
    const [error, setError] = useState<string | null>();
  
    const [search, setSearch] = useState("");
  
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          apiUrl+"/api/v1/services"
        );
        const data: any = await response.data.data;
        setSrvList(data);
        setAllSrv(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching services:", err);
      }
    };
  
    const searchApi = async (s: string) => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/services/search/${s}`
        );
        const data: any = await response.data.data;
        setSrvList(data);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching pets:", err);
      }
    };
  
    useEffect(() => {
      fetchServices();
    }, []);
  
    if (error) {
      return <div>Error fetching services: {error}</div>;
    }
  
    if (!srvList) {
      return <div>Loading services...</div>;
    }
  
    function reloadList(): void {
      fetchServices();
    }
  
    return (
      <div className="flex flex-col space-y-4 mt-5">
        <Input
          placeholder="Tìm kiếm tên, loại, mã Dịch vụ"
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
          srvList.forEach((customer) => {
            cus.push(<Service info={customer} />);
          });
          return cus;
        })()}
      </div>
    );
  }