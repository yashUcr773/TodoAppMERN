export function Logout(props: any) {
    function onLogout() {
        localStorage.removeItem('token')
        props.onLogout('login')
    }
    return (props.showLogoutButton ? <button onClick={onLogout}>Logout</button> : "")
}