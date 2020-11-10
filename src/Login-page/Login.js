import React, { useState } from "react";
import { useDispatch} from "react-redux"; 
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {startLogIn} from '../actions.js';
import "./style.css";

export default function Login() {
  const dispatch = useDispatch(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function login(){
    dispatch(startLogIn(email, password))
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  function showtext(){
    document.get('')
  }
  //disabled={!validateForm()}
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email </ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password </ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large"  onClicklogin={login} >Login</Button>
        <br>
        </br>

      <label>
        Username/Password:
        <br>
        </br>
        <textarea id="usepass"/>
      </label>

      </form>
    </div>
  );
}
