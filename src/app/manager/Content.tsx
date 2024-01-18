import React from 'react'
import Dashboard from './contents/dashboard/Dashboard'
import MakeInvoice from './contents/makeInvoice/MakeInvoice'

export default function Content(props:any) {
  switch (props.actived){
    case 'dashboard': 
        return ( 
            <Dashboard/> 
        )
    case 'makeinvoice':
        return (
            <MakeInvoice />
        )
    case 'staff': 
        return ( 
            <p className='text-black'>NV</p> 
        )
  }
}
