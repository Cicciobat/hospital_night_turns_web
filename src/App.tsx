import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Cookies from "universal-cookie";
import io, {Socket} from "socket.io-client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Turns from "./pages/Turns";
import Layout from "./layout/Layout";
import Extraction from "./pages/Extraction";

const SERVER: string = process.env.REACT_APP_SERVER_URL
const GET_DATA: string = process.env.REACT_APP_SERVER_DATA
const AUTH: string = process.env.REACT_APP_SERVER_AUTH
const LOGIN: string = process.env.REACT_APP_SERVER_LOGIN
const socket: Socket = io(SERVER);
const cookies: Cookies = new Cookies(null, {path: '/'})

const isAuth = async (): Promise<boolean> => {
    return await fetch(AUTH, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": cookies.get('token') ? cookies.get('token') : ''

        },
    }).then(result => {
        switch (result.status) {
            case 200:
                return true;
            case 401:
                return false;
            default:
                return false;
        }
    }).catch(error => {
        console.error("Auth error: ", error)
        return false;
    });
}

function App(): JSX.Element {
    const [messages, setMessages] = useState<[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isExtracted, setIsExtracted] = useState<boolean>(false)
    const [data, setData] = useState<TurnsInterface>({date: new Date(), turns: [{name: "", turn: ""}]})
    const [loaded, setLoaded] = useState<boolean>(false)

    const fetchData = async () => {
        let requestOptions = {
            method: 'POST'
        };
        const response = await fetch(GET_DATA, requestOptions)
        const result = await response.json()
        setData(result)

    }

    useEffect(() => {
        isAuth()
            .then((result: boolean) => setIsLogged(result))
        fetchData().then((response: void) => setLoaded(prev => !prev));
    }, [isExtracted])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Layout isLogged={isLogged} setIsLogged={setIsLogged}/>}>
                    <Route index element={<Home data={data} loaded={loaded}/>}/>
                    <Route path="login" element={<Login setIsLogged={setIsLogged} HOST={LOGIN} cookies={cookies}/>}/>
                    <Route
                        path="turns"
                        element={
                            isLogged ? (
                                <Turns socket={socket} />
                            ) : (
                                <Navigate to='/login'/>
                            )
                        }>
                    </Route>
                    <Route path="extraction" element={
                        <Extraction messages={messages} setMessages={setMessages} setIsExtracted={setIsExtracted} socket={socket}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
