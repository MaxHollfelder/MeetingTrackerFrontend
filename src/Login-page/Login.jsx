import Axios from 'axios';
import React, {useState} from 'react';
import { useHistory, withRouter } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import './style.css';
//import Schedule from './Schedule/index';
//import Candidate from './Candidate/index';


export default function LoginPage(props){
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let errorMessage = useSelector(state => state.errorMessage);

    const history = useHistory(); 

    function login(){
      console.log(email); 
      console.log(password);     
      Axios.post('http://localhost:8080/', null, {params: {
        useremail: email,
        userpassword: password
      }})
      
      .then(function (repsonse){
        console.log(repsonse.data) 
        routeing(repsonse.data)
      })
    }

    function routeing(responseData){
      console.log(responseData); 
      if(responseData == 'super_admin'){
        console.log("routing to super admin");
        history.push('/Home')
      }
      else if(responseData == 'university_participant'){
        history.push('/Participant')
      }
      else if(responseData == 'candidate'){
        history.push('/Candidate')
      }
      else if(responseData == 'meeting_creator'){
        history.push('/Schedule')
      }
      else if(responseData == 'admin'){
        history.push('/Home')
      }
    }

    return(
            <div id="login-container">
                <div id="login-header">UWEC Meeting Tracker</div>
                <div id="login-form-container">
                    <div id="login-form-header">LOGIN</div>
                    <div className="login-form-input-grp">
                        <label className="login-label">Email: </label>
                        <input className="login-input" type="textbox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="login-form-input-grp">
                        <label className="login-label">Password: </label>
                        <input className="login-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <button id="login-btn" onClick={login}>Login</button> 
                    <div className="login-error-msg">
                        {errorMessage}
                    </div>
                </div>
                
            </div>
    )
}