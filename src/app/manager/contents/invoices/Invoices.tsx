import React, { useCallback, useState } from "react";
import InvoicesList from "./InvoicesList";

export default function Invoices() {
  return (
    <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
      <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
        <div className="flex flex-row space-x-4">
          <p className="text-2xl font-bold">Hoá đơn</p>
        </div>
      </div>
      <InvoicesList />
    </div>
  );
}
