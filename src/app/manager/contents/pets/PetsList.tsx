import React, { useEffect, useMemo, useState } from "react";
import Pet from "./Pet";
import axios from "axios";
import { Button, Input } from "@mui/joy";
import ReplayIcon from "@mui/icons-material/Replay";
import { storage } from "../../../../../public/firebase/db";
import { listAll, ref } from "firebase/storage";

export default function PetsList() {
  const [petsList, setPetsList] = useState<Array<any>>();
  const [allPets, setAllPets] = useState<Array<any>>();
  const [error, setError] = useState<string | null>(null);

  // const petImgRef = ref(storage, "pets");

  // listAll(petImgRef)
  //   .then((res) => {
  //     res.items.forEach((itemRef) => {
  //       console.log(
  //         "https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F" +
  //           itemRef.name +
  //           "?alt=media&token=2afc2738-92ce-4468-8279-3d3796121b95"
  //       );
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/v1/pets");
      const data: any = await response.data.data;
      setPetsList(data);
      setAllPets(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching pets:", err);
    }
  };

  const searchApi = async (s: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/pets/search/${s}`
      );
      const data: any = await response.data.data;
      setPetsList(data);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching pets:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (error) {
    return <div>Error fetching pets: {error}</div>;
  }

  if (!petsList) {
    return <div>Loading pets...</div>;
  }

  function reloadList(): void {
    setPetsList(allPets);
  }

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Input
        placeholder="Tìm kiếm tên, loại, giống thú cưng"
        color="neutral"
        size="lg"
        variant="outlined"
        sx={{ "--Input-focused": 1 }}
        onChange={(e: any) => {
          searchApi(e.target.value);
        }}
        className={` rounded-full self-end w-full lg:w-[30%] h-[40px] p-4 items-center mb-3`}
        endDecorator={
          <Button
            className="text-blue-500 hover:scale-110 rounded-full space-x-2"
            onClick={() => reloadList()}
            variant="solid"
          >
            <p className="hidden lg:block">Load lại DS</p>
            <ReplayIcon />
          </Button>
        }
      />
      {(() => {
        const pet: any = [];
        petsList.forEach((p) => {
          pet.push(<Pet info={p} />);
        });
        return pet;
      })()}
    </div>
  );
}
