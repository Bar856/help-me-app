import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function Register(props) {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [navToHome, setNavToHome] = useState(false);
    const [alerts, setAlerts] = useState('');
    const checkPassword = () =>{
        if (password.length>0){
            let numExist = false;
            let letterExist = false;
            // check letter
            for (let i=0;i<password.length;i++){
                if (isNaN(password[i])){
                    letterExist = true;
                    setAlerts('')
                    break;
                }
            }
            if (!(letterExist)){
                setAlerts('סיסמא חייבת לכלול לפחות אות אחת')
                return false;
            }else{
                setAlerts('');
            }
            // check num
            if (/\d/.test(password)){
                setAlerts('');
                numExist = true;
            }else{
                setAlerts('סיסמא חייבת לכלול לפחות ספרה אחת')
                return false;
            }
            // check length
            if (password.length === 8 && letterExist && numExist){
                return true;
            }else{
                setAlerts('ססמא צריכה להיות באורך 8 תווים');
                return false;
            }
        }else{
            return false
        }
    }
    const checkFullName = () => {
        if (fullName.length > 0){
            if (fullName.length > 4){
                setAlerts('');
                if (/\d/.test(fullName)){
                    setAlerts('שם לא יכול להכיל ספרות');
                    return false;
                }else{
                    setAlerts('');
                    return true;
                }
            }else{
                setAlerts('שם חייב להיות באורך של לפחות 4תווים');
                return false
            }
        }else{
            return false
        }
    }
    const checkLogin = () =>{
        if (checkFullName() && checkPassword()){
            props.setUserLoggedIn(fullName)
            props.setPasswordLoggedIn(password)
            setNavToHome(true);
        }
        setFullName(document.getElementById("nameInp").value);
        setPassword(document.getElementById("passwordInp").value);
    }
    // check if user logged in
    useEffect(()=>{
        if (props.userLoggedIn !== ""){
            setNavToHome(true)
        }
    })
  return (
    <div className='container'>
        <h1>הרשמה</h1>
        <div className='row'>
            <label className='alerts' id='alertsLabel'>{alerts}</label>
        </div>

        <div className='row'>
            <input id="nameInp" minLength={4} onChange={()=>checkLogin()} type="text" placeholder='שם מלא'/>
        </div>

        <div className='row'>
            <input minLength={8} id="passwordInp" onChange={()=>checkLogin()} type="password" placeholder='ססמא'/>
        </div>
        {navToHome && <Navigate replace to={props.getUserLink()}/>}
    </div>
  )
}
