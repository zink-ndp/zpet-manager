"use client";
import { useState } from "react";
import { handleLogout } from "../functions";
import { sidebarItems } from "../utils/sidebarItem";
import BackgroundMain from "../component/ui/BackgroundMain";
import DividerHorizon from "../component/ui/DividerHorizon";
import Content from "../manager/Content";
export default function Page() {

  const [activedTab, setActivedTab] = useState("dashboard");
  const [expand, setExpand] = useState(false);

  return (
    <>
      <main className="w-full">
        <div className="flex flex-row z-10 w-full">
          <div
            className={
              ` ${expand ? 'w-[270px]' : 'w-[auto]'} h-[800px] lg:flex relative lg:w-56 z-30 bg-white p-4 m-4 rounded-xl shadow-xl flex-col lg:items-start items-center space-y-5 `
            }
          >
            <p className="hidden lg:blocktext-black text-2xl font-bold self-center py-4">
              ZPet
            </p>
            <button className="sidebar-btn lg:hidden"
                onClick={(e)=>setExpand(!expand)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            {(() => {
              const items: any = [];
              for (let index = 0; index < sidebarItems.length; index++) {
                const item = sidebarItems[index];
                items.push(
                  <button
                    className={
                      activedTab == item.key
                        ? "sidebar-btn-active"
                        : "sidebar-btn"
                    }
                    onClick={() => setActivedTab(item.key)}
                  >
                    {item.icon}
                    {expand ? <p>{item.text}</p> : <p className="hidden lg:block">{item.text}</p>}
                    
                  </button>
                );
                if (index == 0 || index == 2 || index == 4 || index == 6)
                  items.push(<DividerHorizon />);
              }
              return items;
            })()}
            <button className={`sidebar-btn-logout`} onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              {expand ? <p>Đăng xuất</p> : <p className="hidden lg:block">Đăng xuất</p>}
            </button>
          </div>
          <div className="flex flex-col w-full">
            <Content actived={activedTab} />
          </div>
        </div>
        <BackgroundMain />
      </main>
    </>
  );
}
