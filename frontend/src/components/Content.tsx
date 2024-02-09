import { useState } from "react";
import { Login } from "./Login";
import { Todos } from "./Todos";

export function Content(props: any) {

    function onLogin(sec: string) {
        props.onLogin(sec)
    }

    return <div className="main-content">
        {props.section == 'login' ?
            <Login onLogin={onLogin}></Login> :
            props.section == 'todos' ?
                <Todos></Todos> :
                ""

        }
    </div>
}