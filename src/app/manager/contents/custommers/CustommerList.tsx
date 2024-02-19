import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustommerList() {
    const [customers, setCustomers] = useState<Array<any> | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:80/zpet-api/api/custommer/get/list.php");
        const data = await response.data;
        setCustomers(data);
      } catch (err:any) {
        setError(err.message);
        console.error('Error fetching customers:', err);
      }
    };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (error) {
    return <div>Error fetching customers: {error}</div>;
  }

  if (!customers) {
    return <div>Loading customers...</div>;
  }

  return (
    <ul>
      {customers.map((customer) => (
        <li key={customer.id}>
          {/* Display customer details */}
        </li>
      ))}
    </ul>
  );
}
