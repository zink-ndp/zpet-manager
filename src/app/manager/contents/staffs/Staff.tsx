import React, { useState } from "react";
import Image from "next/image";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailIcon from "@mui/icons-material/Mail";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Modal, ModalClose, Sheet } from "@mui/joy";
import StaffDetail from "./StaffDetail";

export default function Staff(props: any) {
  const staff = props.info;
  const [modalOpen, setModalOpen] = useState(false);
  const avatar = require("./default.png");

  return (
    <>
      <div className=" flex flex-row bg-blue-100 rounded-xl shadow-md my-4 p-5 content-between">
        <div className="flex flex-row flex-1">
          <div className=" self-center -ml-2">
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={staff.STF_ISWORKING ? "Working" : "Quited"}
              color={staff.STF_ISWORKING ? "success" : "danger"}
            >
              <Typography
                sx={{
                  marginRight: "10px",
                }}
                fontSize="xl"
              >
                <Image alt="avt" src={avatar} height={65} width={65} />
              </Typography>
            </Badge>
          </div>
          <div className="flex flex-col ml-10">
            <p className="text-blue-800 font-semibold ">{staff.STF_NAME}</p>
            <p className="">{staff.STF_EMAIL}</p>
            <p className="">{staff.STF_PHONE}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row float-end lg:space-x-3">
          <p className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110">
            <PhoneEnabledIcon />
          </p>
          <p className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110">
            <MailIcon />
          </p>
          <p
            className=" cursor-pointer text-blue-500 hover:text-blue-800 hover:scale-110"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <TroubleshootIcon />
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
          <StaffDetail info={props.info}/>
        </Sheet>
      </Modal>
    </>
  );
}
