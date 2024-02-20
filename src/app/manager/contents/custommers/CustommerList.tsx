import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "postcss/lib/list";

export default function CustommerList() {
    const [cusList, setCusList] = useState<Array<any>>();
    const [error, setError] = useState<string | null>();
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/v1/customers");
        const data: any = await response.data.data;
        setCusList(data);
      } catch (err:any) {
        setError(err.message);
        console.error('Error fetching customers:', err);
      }
    };

  useEffect(() => {
    fetchCustomers();
  }, []);

  console.log(cusList)

  if (error) {
    return <div>Error fetching customers: {error}</div>;
  }

  if (!cusList) {
    return <div>Loading customers...</div>;
  }
  return (
    <div>
      {(()=>{
        const cus: any = []
        cusList.forEach((customer)=>{
          cus.push(
            <li>{customer.CTM_NAME}</li>
          )
        })
        return cus
      })()}
    </div>
  );
}
