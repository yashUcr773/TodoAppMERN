import React, { useState } from "react";
import { CONSTANTS } from "../config/Constants.ts"

export function Login(props: any) {

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [showMessage, setShowMessage] = useState(false)
    let [messageVal, setMessageVal] = useState("")

    async function clickHandler(method: String) {
        let response = await fetch(CONSTANTS.apiBaseURL + '/' + method, {
            body: JSON.stringify({ username, password }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        })

        let result = await response.json()

        if (result.success) {
            localStorage.setItem('token', result.token)
            setMessageVal(result.message)
            setShowMessage(true)
            props.onLogin('todos')
        } else {
            setMessageVal(result.message)
            setShowMessage(true)
        }
        setUsername("")
        setPassword("")
    }

    function changeHandler(event: any, label: String) {

        if (label == 'username') {

            setUsername(event.target.value)
            setShowMessage(false)
            setMessageVal("")
        }
        else {

            setPassword(event.target.value)
            setShowMessage(false)
            setMessageVal("")
        }
    }

    return <div className="login-container">
        <div className="form-section">
            <label>Username</label>
            <input type="text" value={username} onChange={(event) => changeHandler(event, 'username')}></input>
        </div>
        <div className="form-section">
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => changeHandler(event, 'password')}></input>
        </div>
        <div className="buttons-container">
            <button onClick={() => clickHandler('signin')}>Login</button>
            <button onClick={() => clickHandler('signup')}>Signup</button>
        </div>
        {showMessage ? <div className="message-container">
            <p>{messageVal}</p>
        </div> : ""}
    </div>
}