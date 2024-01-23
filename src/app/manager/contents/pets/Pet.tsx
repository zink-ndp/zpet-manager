import React from "react";
import Image from "next/image";

export default function Pet() {
  return (
    <div className="flex flex-row space-x-4 rounded-xl bg-blue-50 items-center">
      <Image
        className=" object-cover h-[80px] w-[80px] rounded-xl shadow-lg"
        src="https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="avt"
        height={80}
        width={80}
      />
      <div className="flex flex-row content-center w-full">
        <div className="flex flex-col flex-1 py-3">
          <p className="text-blue-800 font-bold text-lg">
            Chó Corgi - Bảnh tỏn
          </p>
          <p className="text-black font-demibold text-sm">Con Sen: En Thuw</p>
        </div>
        <div className="hidden lg:flex flex-col flex-1 py-3 items-end justify-center">
            <p className="hidden lg:block text-black mr-10">Xem chi tiết</p>
        </div>
      </div>
    </div>
  );
}
