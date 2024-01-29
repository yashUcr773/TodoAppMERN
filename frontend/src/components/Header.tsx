import { Logout } from "./Logout";

export function Header(props: any) {
    function logoutHandlerHeader(state: String) {
        props.logoutHandlerHeaderToMainLifted(state)
    }
    return <header className="header" ><Logout logoutHandlerLogoutToHeaderLifted={logoutHandlerHeader}></Logout></header>
}