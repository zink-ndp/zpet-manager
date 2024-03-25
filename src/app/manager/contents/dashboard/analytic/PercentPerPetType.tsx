import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { apiUrl } from "@/app/utils/apiUrl";
import { convertDateToUTCymd } from "@/app/functions";

export default function PercentPerPetType(props: any) {
  const [ptLabel, setPtLabel] = useState<string[]>(["None"]);
  const [ptValue, setPtValue] = useState<number[]>([0]);

  const fetchByPetType = async (propDF: string, propDT: string) => {
    const dFrom = new Date(propDF);
    const dTo = new Date(propDT);
    try {
      const response = await axios.post(
        apiUrl + `/api/v1/analytics/bypettypes/`,
        {
          dF: convertDateToUTCymd(dFrom.toString()),
          dT: convertDateToUTCymd(dTo.toString()),
        }
      );
      const data = await response.data.data;
      setPtLabel([]);
      setPtValue([]);
      data &&
        data.forEach((dt: any) => {
          setPtLabel((oLb) => [...oLb, dt.label]);
          setPtValue((oVl) => [...oVl, dt.value]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchByPetType(props.dateFrom, props.dateTo);
  }, [props.dateFrom, props.dateTo]);

  let chartData: any = [];

  chartData = [];
  ptLabel &&
    ptLabel.forEach((sL: string, index: number) => {
      chartData.push({ label: sL, value: ptValue[index] });
    });

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
