"use client";
import { useEffect, useState } from "react";
import { sidebarItemsManager, sidebarItemsStaff } from "../utils/sidebarItem";
import Loading from "../component/Loading";
import BackgroundMain from "../component/ui/BackgroundMain";
import Content from "../manager/Content";
import NotLogged from "./NotLogged";
import { useRouter } from "next/navigation";
import { getSessionData } from "../session/getSession";
import { clearSession } from "../session/clearSession";

//icon
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Page() {

  const [activedTab, setActivedTab] = useState("dashboard");
  const [expand, setExpand] = useState(false);
  const [session, setSession] = useState<Array<any>|null>(null);
  const [showLoading, setShowLoading] = useState(false);

  const router = useRouter()

  function handleLogout(){
    setShowLoading(true)
    clearSession("session")
    router.replace("/login")
  }

  useEffect(()=>{
    getSessionData().then( (value) => {
      setSession(value)
    })
  },[])

  // if (session==null){
  //   return (
  //     <NotLogged/>
  //   )
  // }

  // const isAdmin = session[0].STF_ISMANAGER
  
  const isAdmin = true

  const roleSidebar = (
    isAdmin ? sidebarItemsManager : sidebarItemsStaff
  )


  return (
    <>
      <main className="w-full">
        <div className="flex flex-row z-10 w-full">
          <div
            className={
              ` ${expand ? 'w-[200px] fixed top-0 left-0' : 'w-[auto] relative'} ${isAdmin ? 'h-[860px]' : 'h-[660px]'} lg:flex lg:w-56 z-30 bg-white p-4 m-4 rounded-xl shadow-2xl flex-col lg:items-start items-center space-y-5 `
            }
          >
            <p className="hidden lg:block text-black text-2xl font-bold self-center py-4">
              <span className="text-blue-500">
                Z</span>Pet
            </p>
            <button className="sidebar-btn lg:hidden"
                onClick={(e)=>setExpand(!expand)}>
              <ListIcon/>
            </button>
            {(() => {
              const items: any = [];
              for (let index = 0; index < roleSidebar.length; index++) {
                const item = roleSidebar[index];
                items.push(
                  <button
                    key={item.key}
                    className={
                      activedTab == item.key
                        ? "sidebar-btn-active"
                        : "sidebar-btn"
                    }
                    onClick={() => {
                      setActivedTab(item.key)
                      setExpand(false)
                    }}
                  >
                    {item.icon}
                    {expand ? <p>{item.text}</p> : <p className="hidden lg:block">{item.text}</p>}
                    
                  </button>
                );
              }
              return items;
            })()}
            <button className={`sidebar-btn-logout`} 
              onClick={handleLogout}>
              <LogoutIcon/>
              {expand ? <p>Đăng xuất</p> : <p className="hidden lg:block">Đăng xuất</p>}
            </button>
            <div className={` ${showLoading ? "flex" : "hidden"} flex-col items-center justify-center`}>
              <Loading />
              <p className="text-blue-500">Đang đăng xuất</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Content actived={activedTab} session={session} />
          </div>
        </div>
        <BackgroundMain />
      </main>
    </>
  );
}
