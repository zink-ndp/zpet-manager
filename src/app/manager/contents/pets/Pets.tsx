import React, { useState } from "react";
import { Button, Modal, ModalClose, Sheet } from "@mui/joy";
import PetsList from "./PetsList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NewPet from "./NewPet";

export default function Pets() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full my-4 p-5 bg-white text-black rounded-xl">
        <div className="flex flex-row content-evenly justify-between items-center h-[60px]">
          <div className="flex flex-row space-x-4">
            <p className="text-2xl font-bold">Thú cưng</p>
            <Button
              variant="outlined"
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <p className="hidden lg:block">Thêm hồ sơ</p>
              <AddOutlinedIcon className="text-sm" />
            </Button>
          </div>
        </div>
        <PetsList />
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
          <NewPet />
        </Sheet>
      </Modal>
    </>
  );
}
