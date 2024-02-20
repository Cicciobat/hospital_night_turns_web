import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

const Login = ({setIsLogged, HOST, cookies}: any) => {
    const [error, setError] = useState<string>('');
    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        let login: {} = {}

        for (const element of event.target) {
            if (element.type === 'text' || element.type === 'password') {
                login = {
                    ...login,
                    [element.id]: element.value
                }
            }
        }

        await fetch(HOST, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": ''
            },
            body: JSON.stringify(login),
        })
            .then(result => {
                switch (result.status) {
                    case 200: {
                        if (result.headers.has('authorization')) {
                            // @ts-ignore
                            cookies.set('token', result.headers.get('authorization'));
                            setError('')
                            setIsLogged(true)
                            navigate('/')
                        }
                        break;
                    }
                    case 401: {
                        setError('Username e/o password errata.');
                        break;
                    }
                    default: {
                        setError('Impossibile effettuare il login.');
                        break;
                    }

                }


            })
            .catch(error => {
                console.error(error)
            })
    }

    return <div className="grid place-items-center h-screen">
        <div className="bg-[#fff7f2] rounded-2xl border-[1.5px] border-[#f25657]">
            <div className="py-6">
                <h1 className="text-[2rem] text-[#ff6666] px-6">Login</h1>
            </div>
            <form className="flex flex-col justify-center align-middle p-10" onSubmit={handleSubmit}>
                <div className="flex flex-col ">
                    <label>
                        Username <input id="username"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"/>
                    </label>
                </div>
                <div className="flex flex-col mt-5">
                    <label>Password <input id="password"
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           type="password"/>
                    </label>
                </div>
                <div className="my-5">
                    <p className="text-red-600 text-center">{error}</p>
                </div>
                <div className="text-center my-5">
                    <button className="bg-[#ff6666] hover:bg-[#f25657] text-white font-bold py-2 px-4 rounded"
                            type="submit">Login
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default Login;