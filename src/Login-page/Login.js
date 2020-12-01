import Axios from 'axios';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {startLogIn} from '../actions.js';
import './style.css';


export default function LoginPage(props){
    const dispatch = useDispatch();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let errorMessage = useSelector(state => state.errorMessage);

    function login(){
      console.log(email); 
      //sdispatch(startLogIn(email, password));
      const config = {
      headers: {
        "Content-Type" : "application/json"
      },
      data: JSON.stringify({'useremail': email, 'userPassword': password})
    }
      
      Axios.get('http://localhost:8080/Login', config)
      .then(function (repsonse){
        console.log(repsonse);
      })
    }
    // function register(){
    // dispatch(beginRegistering(email, password));
    // }

    return(
            <div id="login-container">
                <div id="login-header">UWEC Scheduler</div>
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