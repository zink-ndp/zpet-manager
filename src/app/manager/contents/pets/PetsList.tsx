import React, { useEffect, useState } from 'react'
import Pet from './Pet'
import axios from 'axios'

export default function PetsList() {

  const [petsList, setPetsList] = useState<Array<any>>()
  const [error, setError] = useState<string>('')

  const fetchPets = async() => {
    try {
      const response = await axios.get("http://localhost:3100/api/v1/pets")
      const data: any = await response.data.data
      setPetsList(data)
    } catch (err:any) {
      setError(err)
      console.error('Error fetching pets:', err);
    }
  }

  useEffect(()=>{
    fetchPets()
  },[])

  if (error) {
    return <div>Error fetching pets: {error}</div>;
  }

  if (!petsList) {
    return <div>Loading pets...</div>;
  }
  
  return (
    <div className='flex flex-col space-y-4 mt-5' >
        {(()=>{
          const pet:any = []
          petsList.forEach((p)=>{
            pet.push(
              <Pet info={p} />
            )
          })
          return pet
        })()}
    </div>
  )
}
