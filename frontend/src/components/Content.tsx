import { useState } from "react";
import { Login } from "./Login";
import { Todos } from "./Todos";

export function Content() {

    const [section, updateSection] = useState<String>('login')

    function onLogin(sec: String) {
        updateSection(sec)
    }


    return <div className="main-content">
        {section == 'login' ?
            <Login onLogin={onLogin}></Login> :
            section == 'todos' ?
                <Todos></Todos> :
                ""

        }
    </div>
}