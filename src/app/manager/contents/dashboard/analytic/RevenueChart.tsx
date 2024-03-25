import { formatMoney, getMonthAmount, convertDateToUTCymd } from "@/app/functions";
import { apiUrl } from "@/app/utils/apiUrl";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

import { useEffect, useState } from "react";
export default function HorizontalBars(props: any) {

  
  const [totalRevenue, setTotalRevenue] = useState()
  const [months, setMonths] = useState<string[]>(["T0"])
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([0])
  
  const fetchRevenue = async (propDF: string, propDT: string) => {
    const dFrom = new Date(propDF)
    const dTo = new Date(propDT)
    try {
      const response = await axios.post(apiUrl+`/api/v1/analytics/revenue/`,{
        dF: convertDateToUTCymd(dFrom.toString()),
        dT: convertDateToUTCymd(dTo.toString())
      })
      const total = await response.data.total
      const monthly = await response.data.monthly
      let totalRevenue = total[0].revenue
      totalRevenue!=null ? totalRevenue = formatMoney(parseInt(totalRevenue)) : totalRevenue = 0
      setTotalRevenue(totalRevenue)
      setMonths([])
      setMonthlyRevenue([])
      if (monthly.length != 0){
        monthly.forEach((m: any) => {
          setMonths((oM)=>[...oM, m.month+"/"+m.year])
          setMonthlyRevenue((oMR)=>[...oMR, m.total])
        })
      } else {
        setMonths(["Không có dữ liệu"]);
        setMonthlyRevenue([0])
      }
       
    
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchRevenue(props.dateFrom, props.dateTo)
  },[props.dateFrom, props.dateTo])

console.log(convertDateToUTCymd(props.dateFrom), convertDateToUTCymd(props.dateTo))

  return (
    <>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: months,
            scaleType: "band",
            label: "Tháng",
          },
        ]}
        series={[
          {
            data: monthlyRevenue,
            color: "#3b82f6",
          },
        ]}
        height={300}
      />
      <p className="text-blue-800 font-semibold text-xl text-center">
        Tổng doanh thu: {totalRevenue}
      </p>
      
    </>
  );
}
