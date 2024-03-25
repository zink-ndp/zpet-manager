import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { apiUrl } from "@/app/utils/apiUrl";
import { convertDateToUTCymd } from "@/app/functions";

export default function PercentPerServices(props: any) {
  const [srvLabel, setSrvLabel] = useState<string[]>(["None"]);
  const [srvValue, setSrvValue] = useState<number[]>([0]);

  const fetchByService = async (propDF: string, propDT: string) => {
    const dFrom = new Date(propDF);
    const dTo = new Date(propDT);
    try {
      const response = await axios.post(
        apiUrl + `/api/v1/analytics/byservices/`,
        {
          dF: convertDateToUTCymd(dFrom.toString()),
          dT: convertDateToUTCymd(dTo.toString()),
        }
      );
      const data = await response.data.data;
      setSrvLabel([]);
      setSrvValue([]);
      data &&
        data.forEach((dt: any) => {
          setSrvLabel((oLb) => [...oLb, dt.label]);
          setSrvValue((oVl) => [...oVl, dt.value]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchByService(props.dateFrom, props.dateTo);
  }, [props.dateFrom, props.dateTo]);

  let chartData: any = [];

  chartData = [];
  srvLabel &&
    srvLabel.forEach((sL: string, index: number) => {
      chartData.push({ label: sL, value: srvValue[index] });
    });
  console.log(chartData);

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      height={200}
    />
  );
}
