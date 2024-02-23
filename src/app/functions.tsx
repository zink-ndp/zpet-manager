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
