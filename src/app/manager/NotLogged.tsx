import React from "react";
import Image from "next/image";
import { Button } from "@mui/joy";
import { useRouter } from "next/navigation";
import BackgroundMain from "../component/ui/BackgroundMain";

export default function NotLogged() {

    const router = useRouter()

  return (
    <main>
      <div className="h-[100vh] flex flex-col lg:flex-row items-center justify-center align-middle space-x-5 space-y-6">
        <div className="">
          <Image
            alt="notloggedImg"
            className=" rounded-full h-[250px] w-[250px] lg:h-[400px] lg:w-[400px] object-cover"
            src="https://images.unsplash.com/photo-1575221241714-b8d56bded0dc?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col space-x-4 space-y-4 items-center justify-center">
          <p className="text-red-700 font-bold text-4xl">Bạn chưa đăng nhập!</p>
          <Button variant="outlined" color="danger"
            onClick={()=>{
                router.replace("/login")
            }}>
            Quay lại trang đăng nhập
          </Button>
        </div>
      </div>
      <BackgroundMain />
    </main>
  );
}
