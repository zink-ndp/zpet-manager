'use client'
import  { useState } from 'react';
import Image from 'next/image';
import BackgroundMain from "../component/ui/BackgroundMain";


export default function Page() {


  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  function handleLogin(){
    console.log(email,pass)
  }

  return <>
    <div className=" flex justify-center h-[100vh] w-[100%] fixed z-10">
        <div className=" place-self-center bg-white shadow-lg rounded-lg flex flex-col lg:flex-row h-[24%] w-[85%] lg:h-[65%] lg:w-[60%]">

        <Image
            className=' rounded-xl object-cover lg:block hidden'
            src="https://images.unsplash.com/photo-1601758175576-648226072e90?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt='dogcat'
            width={700}
            height={300}
          />

        <div className='flex flex-col w-[100%] h-[100%] justify-center items-center p-10 lg:px-32 space-y-6'>
          <p className="text-black text-4xl bold">ZPet Manager Login</p>
          <input
              className="bg-white w-full border-2 border-blue-300 p-3 rounded-md text-black"
              type="text"
              name="email"
              id="ipEmail"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="bg-white w-full border-2 border-blue-300 p-3 rounded-md text-black"
              type="password"
              name="password"
              id="ipPw"
              placeholder="Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <button
              className=" w-full bg-blue-500 hover:bg-blue-300 bold p-3 rounded-md disabled:bg-blue-100"
              disabled = {!email || !pass}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
    </div>
    <BackgroundMain/>
  </>
}
