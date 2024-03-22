import React from 'react'

export function getToday(): String{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var todayString: String = dd + '/' + mm + '/' + yyyy;
    return todayString
}

export function formatMoney(money: number): String {
    const formatedMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(money)
    return formatedMoney
}

export function convertDateToUTC(isoDateString: string): String {
  const date = new Date(isoDateString);
  // Lấy các thành phần ngày tháng
  const day = date.getUTCDate() + 1;
  const month = date.getUTCMonth() + 1; // Tháng tính từ 0 (0 - 11)
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  // Kết quả
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate
}


export function convertDateToUTCymd(isoDateString: string): String {
    const date = new Date(isoDateString);
    // Lấy các thành phần ngày tháng
    const day = date.getUTCDate() + 1;
    const month = date.getUTCMonth() + 1; // Tháng tính từ 0 (0 - 11)
    const year = date.getUTCFullYear();
    // Kết quả
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }
  
