import { Autocomplete, Button, Modal, ModalClose, Sheet } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../../public/firebase/db";
import { ref, uploadBytes } from "firebase/storage";

export default function NewPet() {
  const [cusId, setCusId] = useState<number | null>(null);
  const [ptId, setPtId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [gender, setGender] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [images, setImages] = useState<Array<any>>([]);

  const [cusName, setCusName] = useState<string | null>("");
  const [cusList, setCusList] = useState<Array<any>>();
  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3100/api/v1/customers"
      );
      const data = await response.data.data;
      setCusList(data);
    } catch (error) {}
  };
  const cusNameList: any = [];
  cusList?.forEach((cus) => {
    cusNameList.push(cus.CTM_NAME + " - Mã:" + cus.CTM_ID);
  });

  function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const imgNameList: any = [];
  async function handleAddPet() {
    let imgRef: any;
    images.forEach((img) => {
      imgRef = ref(storage, "pets/" + img.name + ".jpg");
      imgNameList.push(img.name+'.jpg')
      uploadBytes(imgRef, img).then((snapshot) => {
          console.log('Uploaded:' + 'pets/'+img.name+'.jpg');
        });
    });
    try {
      const response = await axios.post("http://localhost:3100/api/v1/pets", {
        cusId: cusId,
        petType: ptId,
        name: name,
        specie: specie,
        gender: gender,
        birthday: birthday,
        img: imgNameList,
      });
      if (response.data.message == "OK") {
        alert("Thêm thú cưng thành công!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <p className="text-xl text-blue-700 font-bold">Thêm thú cưng mới</p>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Tên bé:</p>
          <input
            className="input-form"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Loài:</p>
          <select
            className="input-form"
            name="type"
            id="type"
            onChange={(e) => {
              setPtId(parseInt(e.target.value));
            }}
          >
            <option value="" selected>
              - Chọn loài -
            </option>
            <option value="1">Chó</option>
            <option value="2">Mèo</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Giống:</p>
          <input
            className="input-form"
            type="text"
            name="specie"
            id="specie"
            value={specie}
            onChange={(e) => {
              setSpecie(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Giới tính:</p>
          <select
            className="input-form"
            name="type"
            id="type"
            onChange={(e) => {
              setGender(parseInt(e.target.value));
            }}
          >
            <option value="" selected>
              - Chọn giới tính -
            </option>
            <option value="0">Đực</option>
            <option value="1">Cái</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Ngày sinh:</p>
          <input
            className="input-form"
            type="date"
            name="birth"
            id="birth"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">Chủ của bé:</p>
          <Autocomplete
            placeholder="Tên khách hàng"
            options={cusNameList}
            value={cusName}
            className="w-full h-[50px]"
            onChange={(event, nValue) => {
              setCusName(nValue);
              setCusId(nValue ? parseInt(nValue.split(":")[1]) : null);
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-blue-500 font-semibold">
            Hình ảnh:
            <span className="italic text-base text-neutral-500">
              {" "}
              (Ảnh đầu tiên là ảnh chính)
            </span>
          </p>
          <input
            type="file"
            name="img"
            id="img"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                let randomName = generateRandomString(15);
                const renamedFile = new File([file], randomName, {
                  type: file.type,
                  lastModified: file.lastModified,
                });
                setImages((images) => [...images, renamedFile]);
              }
            }}
          />
        </div>
        <div className="flex flex-row space-y-2">
          {(() => {
            const imgs: any = [];
            images.forEach((img) => {
              imgs.push(
                <Image
                  alt="img"
                  height={100}
                  width={100}
                  src={URL.createObjectURL(img)}
                />
              );
            });
            return imgs;
          })()}
        </div>
        <button
          onClick={() => {
            handleAddPet();
          }}
          className="primary-btn"
        >
          Thêm
        </button>
      </div>
    </>
  );
}
