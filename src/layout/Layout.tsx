import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const Layout = ({isLogged, setIsLogged}: any) => {
    return <><Header isLogged={isLogged} setIsLogged={setIsLogged} /> <Outlet/></>
}

export default Layout;