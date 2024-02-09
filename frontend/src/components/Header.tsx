import { Logout } from "./Logout";

export function Header(props: any) {
    function onLogout(state: string) {
        props.onLogout(state)
    }
    return <header className="header" >
        <Logout onLogout={onLogout} showLogoutButton={props.showLogoutButton}></Logout>
    </header>
}