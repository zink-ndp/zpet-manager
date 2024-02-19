import { BarChart } from "@mui/x-charts/BarChart";
import dayjs, { Dayjs } from "dayjs";

import { useState } from "react";
export default function HorizontalBars() {
  return (
    <>
    
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: [
              "T1",
              "T2",
              "T3",
              "T4",
              "T5",
              "T6",
              "T7",
              "T8",
              "T9",
              "T10",
              "T11",
              "T12",
            ],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3, 5, 2, 7, 2, 8, 1, 3, 2, 8],
            color: "#3b82f6",
          },
        ]}
        height={300}
      />
      <p className="text-blue-800 font-semibold text-xl text-center">
        Biểu đồ doanh thu{" "}
      </p>
      
    </>
  );
}
