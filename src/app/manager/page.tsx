"use client"
import { useState } from 'react'
import BackgroundMain from '../component/ui/BackgroundMain'
import DividerHorizon from '../component/ui/DividerHorizon'
import Content from '../manager/Content'

export default function Page() {

    const sidebarItems = [
        {"key":"dashboard","text":"Tổng quan"},
        {"key":"makeinvoice","text":"Lập hoá đơn"},
        {"key":"invoices","text":"Hoá đơn"},
        {"key":"pets","text":"Thú cưng"},
        {"key":"custommers","text":"Khách hàng"},
        {"key":"staffs","text":"Nhân viên"},
        {"key":"services","text":"Dịch vụ"},
        {"key":"account","text":"Tài khoản"},
    ]

    const [expanded, setExpanded] = useState(false)
    const [activedTab, setActivedTab] = useState('dashboard')

    function handleLogout(){
        throw new Error('Function not implemented.')
    }

  return <>
    <main className="w-full">
        <div className={`flex flex-row-reverse justify-between z-20 p-5 fixed top-0 w-[100%]`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                className="w-7 h-7 text-black hover:text-blue-500 lg:text-transparent"
                onClick={()=>setExpanded(!expanded)}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
        <div className={expanded ? 'hidden' : 'flex' + ` lg:hidden bg-white z-50 p-4 m-5 fixed top-5 right-5 rounded-xl flex-col space-y-5`}>
            {(() => {
                const items:any = []
                sidebarItems.forEach(item => {
                    items.push(<button className='sidebar-btn' onClick={()=>setActivedTab(item.key)}
                                >{item.text}</button>)
                });
                return items
            })()}
            <button className='sidebar-btn-logout'
                onClick={handleLogout}
            >Đăng xuất</button>
        </div>
        <div className='flex flex-row z-10 w-full'>
            <div className={`hidden lg:flex bg-white w-60 p-4 m-5 rounded-xl shadow-md flex-col space-y-5`} >
                <p className="text-black text-2xl font-bold self-center py-4">ZPet</p>
                {(()=>{
                    const items:any = []
                    for (let index = 0; index < sidebarItems.length; index++) {
                        const item = sidebarItems[index];
                        items.push(<button className={activedTab == item.key ? 'sidebar-btn-active' : 'sidebar-btn'}
                                        onClick={()=>setActivedTab(item.key)}
                                    >{item.text}</button>)
                        if (index==0 || index==2 || index==4 || index==6) items.push(<DividerHorizon/>)
                    }
                    return items
                })()}
                <button className={`sidebar-btn-logout`}
                    onClick={handleLogout}
                >Đăng xuất</button>
            </div>
            <Content actived={activedTab}/>
        </div>
        <BackgroundMain/>
    </main>
  </>
}
