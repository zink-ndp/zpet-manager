import React from 'react'
import Dashboard from './contents/dashboard/Dashboard'

export default function Content(props:any) {
  switch (props.actived){
    case 'dashboard': 
        return ( 
            <Dashboard/> 
        )
    case 'staff': 
        return ( 
            <p className='text-black'>NV</p> 
        )
  }
}
