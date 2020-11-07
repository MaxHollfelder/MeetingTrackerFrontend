export const Action = Object.freeze({
    Login: "login",
})

const host = 'http://localhost:8080';
//const host = 'http://167.172.158.78:8444';
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
    const options = {
        method: "Post",
        headers: {
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({email, password}),
    }
    return dispatch => {
        fetch(`${host}/auth/login`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.accessToken){
                console.log("Logged in successfully");
                localStorage.setItem("user", JSON.stringify(data));
                dispatch(successfulLogin(data));
            }
        })
        .catch(err => {
            console.log("Log in failure");
        })
    }
}
export function successfulLogin(data){
    return{
    type: Action.Login, 
    payload: data 
    }
}