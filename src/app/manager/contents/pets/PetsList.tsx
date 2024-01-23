import React from 'react'
import Pet from './Pet'

export default function PetsList() {
  return (
    <div className='flex flex-col space-y-4 mt-5' >
        <Pet/>
        <Pet/>
        <Pet/>
    </div>
  )
}
