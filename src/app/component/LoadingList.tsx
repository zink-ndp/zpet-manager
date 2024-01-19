import LinearProgress from '@mui/joy/LinearProgress'
import React from 'react'

export default function LoadingList() {
  return (
    <div className='w-full h-full items-center justify-center'>
        <LinearProgress size="lg" />
    </div>
  )
}
