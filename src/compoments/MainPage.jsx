import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import ButtonOfEm from './ButtonOfEm';

export default function MainPage(props) {
    const [showMenu, setShowMenu] = useState(false);
    const menyBtnFn = () =>{
        setShowMenu(!showMenu);
    }
    const [navToCall, setNavToCall] = useState(false);
    
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-4'>
                <button onClick={menyBtnFn}>תפריט</button>
            </div>
            <div className='col-3'></div>
            <div className='col-2'>{props.whoToCall.number}</div>
            <div className='col-3'>{props.whoToCall.sign}</div>
        </div>
        <div className='row' style={showMenu ? {'display':'block'} : {'display':'none'}}>
            <div className='row col-3'>
                {
                    props.emergencyList.map((em,i)=>{
                        return <ButtonOfEm id={i} key={i} setShowMenu={setShowMenu} setWhoToCall={props.setWhoToCall} em={em}/>
                    })
                }
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <button onClick={()=>{setNavToCall(true)}} className='helpMeBtn'>הצילו!</button>
            </div>     
        </div>
        {navToCall && <Navigate replace to={props.getCallLink()}/>}
    </div>
  )
}
