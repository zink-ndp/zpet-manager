import React from "react";
import Dashboard from "./contents/dashboard/Dashboard";
import MakeInvoice from "./contents/makeInvoice/MakeInvoice";
import Invoices from "./contents/invoices/Invoices";
import Pets from "./contents/pets/Pets";
import Custommers from "./contents/custommers/Custommers";

export default function Content(props: any) {
  switch (props.actived) {
    case "dashboard":
      return <Dashboard />;
    case "makeinvoice":
      return <MakeInvoice />;
    case "invoices":
      return <Invoices />;
    case "pets":
      return <Pets />;
    case "custommers":
      return <Custommers />;
    case "staff":
      return <p className="text-black">NV</p>;
  }
}
