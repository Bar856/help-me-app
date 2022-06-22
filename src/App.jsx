import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './compoments/Register';
import Header from './compoments/Header';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MainPage from './compoments/MainPage';
import CallPage from './compoments/CallPage';
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState('')
  const [passwordLoggedIn, setPasswordLoggedIn] = useState('')
  
  class EmergencyNum{
    constructor(name,number,sign){
      this.name=name;
      this.number=number;
      this.sign = sign;
      this.chosen = false;
    }
    setChosen(){
      this.chosen = true;
    }
  }
  const op1 = new EmergencyNum('מגן דוד אדום',101,'A')
  const op2 = new EmergencyNum('משטרה',100,'B')
  const op3 = new EmergencyNum('כיבוי והצלה',102,'C')
  const emergencyListTmp = [op1,op2,op3]
  const [emergencyList, setEmergencyList] = useState(emergencyListTmp)

  const [whoToCall, setWhoToCall] = useState(op1);
  
  const getUserLink = () =>{
    return `/help-me-app/user-${userLoggedIn}`
  }
  const getCallLink = () => {
    return `/help-me-app/user-${userLoggedIn}/${whoToCall.number}`
  }
  
  return (
    <div className="App" style={{direction:"rtl"}}>
      <Router>
        <Routes>
          <Route path='/help-me-app' element={<Register  userLoggedIn={userLoggedIn} setPasswordLoggedIn={setPasswordLoggedIn} getUserLink={getUserLink} setUserLoggedIn={setUserLoggedIn}/>}/>
          <Route path={getUserLink()} element={<MainPage  emergencyList={emergencyList} getCallLink={getCallLink} whoToCall={whoToCall} setWhoToCall={setWhoToCall} userLoggedIn={userLoggedIn}/>}/>
          <Route path={getCallLink()} element={<CallPage getUserLink={getUserLink} passwordLoggedIn={passwordLoggedIn} whoToCall={whoToCall} userLoggedIn={userLoggedIn}/>}/>
        </Routes>
        <Header title='!Help Me'/>
      </Router>
    </div>
  );
}

export default App;
