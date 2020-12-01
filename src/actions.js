import authHeader from '../src/auth-header';
import axios from 'axios'; 
export const Action = Object.freeze({
    Login: "login",
})

// this is the base spring boot web address that the api's are going to be looking at 
const api = 'http://localhost:8080';

function checkForErrors(response){
    if(response.status >= 200 && response.status < 300){
        return response;
    }
    else{
        console.log('error');
        throw Error(`${response.status}: ${response.statusText}`)
    } 
}

export function startLogIn(email, password){
    console.log("here")
    console.log(email)
    console.log(password)
    const options = {
        method: "GET",
        headers: {
        ...authHeader(),
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({email, password
            
        }),
    }
    return dispatch => {
        fetch(`http://localhost:8080/Login`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
                //console.log("Logged in successfully");
                console.log(data); 
                //localStorage.setItem("user", JSON.stringify(data));
                //dispatch(successfulLogin(data));
        })
        .catch(err => {
            console.log("Log in failure");
        })
    }
}
// export function successfulLogin(data){
//     return{
//     type: Action.Login, 
//     payload: data 
//     }
// }