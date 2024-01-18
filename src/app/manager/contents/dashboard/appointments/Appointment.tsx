import React from 'react'
import Image from 'next/image'

export default function Appointment(props:any) {
  return (
    <div className="bg-blue-50 w-full h-[100px] p-[10px] rounded-2xl flex flex-row group hover:scale-105 transition-all ease-in-out">
        <Image
            className=' rounded-full object-cover h-[80px] w-[80px] shadow-lg'
            src='https://images.unsplash.com/photo-1636910826093-aafd696e3bd2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='avt'
            height={80}
            width={80}
            />
        <div className="flex flex-col p-3 ml-4">
            <p className="text-blue-800 text-xl font-bold">Tên khách hàng</p>
            <p className="text-black text-lg ">{props.type}</p>
        </div>
    </div>
  )
}
