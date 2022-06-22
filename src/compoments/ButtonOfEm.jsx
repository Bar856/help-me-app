import React from 'react'

export default function ButtonOfEm(props) {
    const clickFn = () =>{
        props.setWhoToCall(props.em);
        props.setShowMenu(false);
        props.em.setChosen();
    }
  return (
    <button style={props.em.chosen ? {'backgroundColor':'grey'} : {'backgroundColor':'white'}} onClick={clickFn}>{props.em.name}</button>
  )
}
