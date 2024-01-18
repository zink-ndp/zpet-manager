import React from 'react'

export function handleLogout(){
    throw new Error('Function not implemented.')
}

export function handleLogin(){
    throw new Error('Function not implemented.')
}

export function getToday(): String{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var todayString: String = dd + '/' + mm + '/' + yyyy;
    return todayString
}
