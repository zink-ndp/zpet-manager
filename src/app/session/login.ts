"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { key } from "../utils/cryptKey"
var CryptoJS = require("crypto-js");


export async function login(sessionData: any) {
  const encryptedSessionData = encrypt(sessionData); // Encrypt your session data
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  redirect("/manager")
}

function encrypt(sessionData: any): any {
    var encryptedSessionData = CryptoJS.AES.encrypt(JSON.stringify(sessionData), key).toString()
    return encryptedSessionData
}

