import React from "react";
import Dashboard from "./contents/dashboard/Dashboard";
import Appointments from "./contents/appointments/Appointments";
import MakeInvoice from "./contents/makeInvoice/MakeInvoice";
import Invoices from "./contents/invoices/Invoices";
import Pets from "./contents/pets/Pets";
import Custommers from "./contents/customers/Customers";
import Staffs from "./contents/staffs/Staffs";
import Services from "./contents/services/Services";
import Vouchers from "./contents/vouchers/Vouchers";

export default function Content(props: any) {
  switch (props.actived) {
    case "dashboard":
      return <Dashboard />;
    case "appointments":
      return <Appointments />;
    case "makeinvoice":
      return <MakeInvoice />;
    case "invoices":
      return <Invoices />;
    case "pets":
      return <Pets />;
    case "custommers":
      return <Custommers />;
    case "staffs":
      return <Staffs />;
    case "services":
      return <Services />;
    case "vouchers":
      return <Vouchers />;
  }
}
