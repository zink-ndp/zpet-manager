import React, { useState } from "react";
import Image from "next/image";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import Face3Icon from "@mui/icons-material/Face3";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailIcon from "@mui/icons-material/Mail";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Modal, ModalClose, Sheet } from "@mui/joy";
import CustomerDetail from "./CustomerDetail";

export default function Customer(props: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const avatar = require('./default.png')

  return (
    <>
      <div className=" flex flex-row bg-blue-100 rounded-xl shadow-md my-4 p-5 content-between">
        <div className="flex flex-row flex-1">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent="Active"
            color="success"
          >
            <Typography
              sx={{
                marginRight: "10px",
              }}
              fontSize="xl"
            >
              {/* <Face3Icon className="text-blue-500" /> */}
              <Image
                alt="avt"
                src={avatar}
                height={50}
                width={50}
              />
            </Typography>
          </Badge>
          <div className="flex flex-col">
            <p className="text-blue-800 font-semibold ml-7">
              {props.info.CTM_NAME}
            </p>
            <p className="ml-7">
              {props.info.CTM_PHONE}
            </p>
          </div>
        </div>
        <div className="flex flex-row float-end space-x-3">
          <p className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110">
            <PhoneEnabledIcon/>
          </p>
          <p className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110">
            <MailIcon/>
          </p>
          <p className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110"
            onClick={()=>{setModalOpen(!modalOpen)}}>
            <TroubleshootIcon/>
          </p>
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: { sm: 0.8, lg: 0.5 },
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <CustomerDetail info={props.info}/>
        </Sheet>
      </Modal>
    </>
  );
}
