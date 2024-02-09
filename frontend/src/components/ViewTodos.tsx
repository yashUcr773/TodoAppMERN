import { useEffect, useState } from "react"
import { CONSTANTS } from "../config/Constants"

interface TODO {
    _id: string,
    completed: boolean,
    title: string,
    description: string,
}

export function ViewTodos() {

    const [todos, setTodos] = useState([])
    function fetchTodos() {
        fetch(CONSTANTS.apiBaseURL + '/todos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('token') || "123"
            },

        }).then((response) => {
            response.json().then((todosResponse => {
                console.log(todosResponse.todos)
                setTodos(todosResponse.todos)
            }))

        })
    }

    useEffect(() => {
        fetchTodos()
        // setInterval(() => {
        //     fetchTodos()
        // }, 10000)

    }, [])

    async function todoUpdated(event: any, todoid: string) {
        console.log(event.target.checked)
        // await fetch(CONSTANTS.apiBaseURL + '/' + 'todos/' + todoid, {
        //     body: JSON.stringify({ completed: event.target.checked }),
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Authorization': localStorage.getItem('token') || "123"
        //     },

        // })


        setTodos((prevTodos) => {
            console.log(prevTodos)
            debugger
            prevTodos.map((todo: TODO) => {
                if (todo._id == todoid) {
                    todo.completed = event.target.checked
                }
                return todo
            })
            console.log(prevTodos)
            debugger
            return prevTodos
        })


    }

    return <div className="todos-container">
        {todos.map((todo: TODO) => {
            return <div className="todo-container" key={todo._id}>
                <input type="checkbox" checked={todo.completed} onChange={(event) => todoUpdated(event, todo._id)}></input>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
            </div>
        })}
    </div>
}