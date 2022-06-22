import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function CallPage(props) {
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [abortShow, setAbortShow] = useState(false)
    const [navToHome, setNavToHome] = useState(false);
    const [disableAbortBtn, setDisableAbortBtn] = useState(false)
    const [tries, setTries] = useState(1);

    const abortCall = () =>{
        if (password !== passwordConf){
            document.getElementById("alertPasswordCall").innerHTML ='סיסמאות לא תואמות';
            return false
        }
        if (password === props.passwordLoggedIn && passwordConf === props.passwordLoggedIn){
            setNavToHome(true);
        }else{
            setTries(tries+1);
            document.getElementById("alertPasswordCall").innerHTML = ` נותרו עוד ${(3-tries)} נסיונות`;
            if (tries === 3){
                setDisableAbortBtn(true);
            }
        }
    }
  return (
    <div className='container'>
        <div className='row'>
            <label className='callingLabel'>
                {props.whoToCall.name}<br/>
                מתקשר<br/>
                {props.userLoggedIn}
            </label>
        </div>
        <div className='row'>
            <div className='col'>
                <button onClick={()=>setAbortShow(true)}>ביטול</button>
            </div>
        </div>
        <div style={abortShow ? {'display':'block'} : {'display':'none'}}>
            <div className='row'>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='הקש סיסמא' />
            </div>
            <div className='row'>
                <input type="password" onChange={(e)=>{setPasswordConf(e.target.value)}} placeholder='הקש אישור סיסמא' />
            </div>
            <div className='row'>
                <button disabled={disableAbortBtn ? true : false} onClick={abortCall}>אשר</button>
            </div>
            <div className='row'>
                <label id='alertPasswordCall' className='alerts'>
                </label>
            </div>
        </div>
        {navToHome && <Navigate replace to={props.getUserLink()}/>}
    </div>
  )
}
