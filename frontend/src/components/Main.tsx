import { useState } from "react";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Main() {

    const [section, updateSection] = useState("login")
    const [showLogoutButton, updateShowLogoutButton] = useState(false)

    function logoutHandlerMain(state: string) {
        updateSection(state)
        updateShowLogoutButton(false)
    }

    function loginHandlerMain(state: string) {
        updateSection(state)
        updateShowLogoutButton(true)
    }


    return <div className="main">
        <Header onLogout={logoutHandlerMain} showLogoutButton={showLogoutButton}></Header>
        <Content section={section} onLogin={loginHandlerMain}></Content>
        <Footer></Footer>
    </div>
}