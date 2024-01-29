import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Main() {

    function logoutHandlerMain(state: String) {

    }


    return <div className="main">
        <Header logoutHandlerHeaderToMainLifted={logoutHandlerMain}></Header>
        <Content ></Content>
        <Footer></Footer>
    </div>
}