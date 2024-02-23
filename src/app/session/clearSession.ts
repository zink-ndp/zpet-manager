"use server"

import { cookies } from 'next/headers'

export async function clearSession(name: string){
    cookies().delete(name)
}