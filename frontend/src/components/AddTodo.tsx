import { useState } from "react"
import { CONSTANTS } from "../config/Constants"

export function AddTodo() {


    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [showMessage, setShowMessage] = useState(false)
    let [messageVal, setMessageVal] = useState("")

    async function clickHandler() {
        let response = await fetch(CONSTANTS.apiBaseURL + '/' + 'todos', {
            body: JSON.stringify({ title, description }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('token') || "123"
            },

        })

        let result = await response.json()

        if (result.success) {
            localStorage.setItem('token', result.token)
            setMessageVal(result.message)
            setShowMessage(true)
        } else {
            setMessageVal(result.message)
            setShowMessage(true)
        }
        setTitle("")
        setDescription("")
    }

    function changeHandler(event: any, label: String) {

        if (label == 'title') {

            setTitle(event.target.value)
            setShowMessage(false)
            setMessageVal("")
        }
        else {

            setDescription(event.target.value)
            setShowMessage(false)
            setMessageVal("")
        }
    }

    return <div className="add-todo-container">
        <div className="form-section">
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => changeHandler(event, 'title')}></input>
        </div>
        <div className="form-section">
            <label>Description</label>
            <input type="text" value={description} onChange={(event) => changeHandler(event, 'description')}></input>
        </div>
        <div className="buttons-container">
            <button onClick={() => clickHandler()}>Add Todo</button>
        </div>
        {showMessage ? <div className="message-container">
            <p>{messageVal}</p>
        </div> : ""}
    </div>
}