import React from "react";

export default function PetHealth() {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-48 w-full bg-blue-50 rounded-xl p-5 mt-3">
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
    </>
  );
}
