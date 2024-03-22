/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/joy";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Modal, ModalClose, Sheet } from "@mui/joy";
import PetHealthHistory from "./PetHealthHistory";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { apiUrl } from "@/app/utils/apiUrl";
import PetHealthUpdate from "./PetHealthUpdate";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { convertDateToUTC, convertDateToUTCymd } from "@/app/functions";

var date_format = require("date-format");

export default function PetDetail(props: any) {
  const [petInfo, setPetInfo] = useState<Array<any>>([""]);
  const [petImgs, setPetImgs] = useState<Array<any>>([props.mainImg]);
  const [error, setError] = useState<string | null>(null);

  const [cusList, setCusList] = useState<Array<any>>();
  const [owner, setOwner] = useState("")
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [specie, setSpecie] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  const [showingImg, setShowingImg] = useState(props.mainImg);
  const [showingIndex, setShowingIndex] = useState(1);

  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
  const [modalOpenHistory, setModalOpenHistory] = useState(false);

  function setDefault() {
    setOwner(petInfo[0].CTM_ID)
    setName(petInfo[0].P_NAME);
    setType(petInfo[0].PT_ID);
    setSpecie(petInfo[0].P_SPECIE);
    setGender(petInfo[0].P_GENDER);
    setBirth(petInfo[0].P_BIRTHDAY);
    setIsInfoChanged(false);
  }

  const fetchPetInfo = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/pets/" + props.id);
      const data: any = await response.data.data;
      setPetInfo(data);
    } catch (err: any) {
      setError(err);
    }
  };

  const fetchPetImgs = async () => {
    try {
      const response = await axios.get(
        apiUrl + "/api/v1/pets/" + props.id + "/imgs"
      );
      const data: any = await response.data.data;
      setPetImgs(data);
    } catch (err: any) {
      setError(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/v1/customers");
      const data: any = await response.data.data;
      setCusList(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchPetInfo();
    fetchPetImgs();
    fetchCustomers();
  }, []);

  useEffect(() => {
    setOwner(petInfo[0].CTM_ID)
    setName(petInfo[0].P_NAME);
    setType(petInfo[0].PT_ID);
    setSpecie(petInfo[0].P_SPECIE);
    setGender(petInfo[0].P_GENDER);
    setBirth(petInfo[0].P_BIRTHDAY);
  }, [petInfo]);

  const cusNameList: any = [];
  cusList &&
    cusList.forEach((cus) => {
      cusNameList.push(cus.CTM_NAME + " - Mã:" + cus.CTM_ID);
    });

  const lenImgList: number = petImgs.length;
  const getNextImg = (showingIndex: number) => {
    if (showingIndex === lenImgList - 1) {
      setShowingIndex(0);
    } else {
      setShowingIndex(showingIndex + 1);
    }
    console.log(showingIndex, petImgs[showingIndex]);
    const img =
      "https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F" +
      petImgs[showingIndex].PIMG_LINK +
      "?alt=media&token=2afc2738-92ce-4468-8279-3d3796121b95";
    setShowingImg(img);
  };

  const getPreImg = (showingIndex: number) => {
    if (showingIndex === 0) {
      setShowingIndex(lenImgList - 1);
    } else {
      setShowingIndex(showingIndex - 1);
    }
    const img =
      "https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F" +
      petImgs[showingIndex].PIMG_LINK +
      "?alt=media&token=2afc2738-92ce-4468-8279-3d3796121b95";
    setShowingImg(img);
  };

  async function handleUpdate() {
    const birthday = convertDateToUTCymd(birth)
    console.log(owner, name, type, specie, gender, birthday);
    try {
      const response = await axios.put(apiUrl+"/api/v1/pets/"+ props.id,{
        owner: owner,
        name: name,
        type: parseInt(type),
        specie: specie,
        gender: parseInt(gender),
        birth: birthday
      })
      alert("Cập nhật thành công!")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-col p-2 justify-center items-center">
        <p className="text-xl font-bold mt-1 self-center">Chi tiết thú cưng</p>
        <div className="flex flex-row mt-5 items-center justify-center">
          <div className="flex flex-row m-5">
            <div
              className="text-blue-400 mx-2 p-1 hover:text-blue-700 hover:scale-125 hover:bg-blue-100 rounded-full self-center"
              onClick={() => {
                getPreImg(showingIndex);
              }}
            >
              <NavigateBeforeIcon />
            </div>
            <Image
              className=" flex-1 object-cover h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] rounded-xl shadow-lg"
              alt="petimg"
              width={100}
              height={100}
              src={showingImg}
            />
            <div
              className="text-blue-400 mx-2 p-1 hover:text-blue-700 hover:scale-125 hover:bg-blue-100 rounded-full self-center"
              onClick={() => {
                getNextImg(showingIndex);
              }}
            >
              <NavigateNextIcon />
            </div>
          </div>
          <div className="flex flex-col justify-start m-5">
            <div>
              <span className="text-xl text-blue-700 font-semibold">
                Chủ của nó:{" "}
              </span>
              <select
                className="input-form w-full h-[40px] p-1"
                name="chucuano"
                id=""
                onChange={(e)=>{
                  setIsInfoChanged(true)
                  setOwner(e.target.value)
                }}
              >
                {(() => {
                  const owner: any = [];
                  cusNameList.forEach((cus: any) => {
                    owner.push(<option selected={cus.split(":")[1] == petInfo[0].CTM_ID} value={cus.split(":")[1]}>{cus}</option>);
                  });
                  return owner;
                })()}
              </select>
            </div>
            <div>
              <span className="text-xl text-blue-700 font-semibold">Tên: </span>
              <input
                className="input-form w-full h-[40px] p-1"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsInfoChanged(true);
                }}
              />
            </div>
            <div>
              <span className="text-xl text-blue-700 font-semibold">
                Loài:{" "}
              </span>

              <select
                className="input-form w-full h-[40px] p-1"
                name="type"
                id=""
                onChange={(e) => {
                  setType(e.target.value);
                  setIsInfoChanged(true);
                }}
              >
                <option selected={type == "1" ? true : false} value="1">
                  Chó
                </option>
                <option selected={type == "2" ? true : false} value="2">
                  Mèo
                </option>
              </select>
            </div>
            <div>
              <span className="text-xl text-blue-700 font-semibold">
                Giống:{" "}
              </span>
              <input
                className="input-form w-full h-[40px] p-1"
                value={specie}
                onChange={(e) => {
                  setSpecie(e.target.value);
                  setIsInfoChanged(true);
                }}
              />
            </div>
            <div>
              <span className="text-xl text-blue-700 font-semibold">
                Giới tính:{" "}
              </span>

              <select
                className="input-form w-full h-[40px] p-1"
                name="type"
                id=""
                onChange={(e) => {
                  setGender(e.target.value);
                  setIsInfoChanged(true);
                }}
              >
                <option selected={!gender ? true : false} value="0">
                  Đực
                </option>
                <option selected={gender ? true : false} value="1">
                  Cái
                </option>
              </select>
            </div>
            <div>
              <span className="text-xl text-blue-700 font-semibold">
                Ngày sinh:{" "}
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="input-form w-full h-[40px] p-1"
                  value={dayjs(birth)}
                  onChange={(newValue: any) => {
                    setBirth(newValue);
                    setIsInfoChanged(true);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-6 w-full flex flex-row space-x-1">
              <div className="flex-1 w-full">
                <Button
                  variant="outlined"
                  className=" w-full"
                  disabled={!isInfoChanged}
                  onClick={() => {
                    setDefault();
                  }}
                >
                  Mặc định
                </Button>
              </div>
              <div className="flex-1 w-full">
                <Button
                  variant="solid"
                  className=" w-full"
                  disabled={!isInfoChanged}
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-blue-700 font-bold mt-5 mb-2 text-xl">Sức khoẻ</p>

        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row w-full bg-blue-50 rounded-xl">
            <p className="text-black font-semibold">
              <span className="text-blue-700">Ngày khám: </span>
              24/11/2022
            </p>
            <p className="text-black font-semibold">
              <span className="text-blue-700">Cân nặng: </span>
              21kg
            </p>
            <p className="text-black font-semibold">
              <span className="text-blue-700">Tình trạng sức khoẻ: </span>
              Tốt
            </p>
          </div>
          <div className="flex flex-row space-x-5 mt-5 items-center justify-center">
            <Button
              className="flex-1"
              onClick={() => {
                setModalOpenUpdate(!modalOpenUpdate);
              }}
              variant="solid"
            >
              Cập nhật sức khoẻ
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setModalOpenHistory(!modalOpenHistory);
              }}
              variant="outlined"
            >
              Xem thêm lịch sử sức khoẻ
            </Button>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpenHistory}
        onClose={() => setModalOpenHistory(false)}
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
          <PetHealthHistory id={props.info} />
        </Sheet>
      </Modal>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpenUpdate}
        onClose={() => setModalOpenUpdate(false)}
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
          <PetHealthUpdate id={props.info} />
        </Sheet>
      </Modal>
    </>
  );
}
