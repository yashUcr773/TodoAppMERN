export function Logout(props: any) {
    function logoutHandlerLogoutComponent() {
        localStorage.removeItem('token')
        props.logoutHandlerLogoutToHeaderLifted('login')
    }
    return <button onClick={logoutHandlerLogoutComponent}>Logout</button>
}