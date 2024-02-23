"use server"
import { cookies } from 'next/headers'
import { key } from "../utils/cryptKey"
var CryptoJS = require("crypto-js");
 
export async function getSessionData() {
  const encryptedSessionData = cookies().get('session')?.value
  return encryptedSessionData ? decrypt(encryptedSessionData) : null
}

function decrypt(encryptedSessionData: any): any {
    var temp = CryptoJS.AES.decrypt(encryptedSessionData, key)
    var decryptedSessionData = JSON.parse(temp.toString(CryptoJS.enc.Utf8))
    return decryptedSessionData
}