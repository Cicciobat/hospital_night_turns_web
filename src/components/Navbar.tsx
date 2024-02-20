import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";


const Navbar = ({isLogged, setIsLogged}: any) => {
    const navigate: NavigateFunction = useNavigate();
    const handleLogout = () => {
        const cookies: Cookies = new Cookies(null, {path: '/'})

        cookies.remove('token');
        setIsLogged(false);
        navigate('/');
    }


    return (
            <nav className="w-full md:block md:w-auto">
                <ul className="font-medium flex flex-col p-4 pb-0 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-[#f25657] text-[1.2rem] md:text-[1rem]">
                    <li className="grid justify-center pb-2 mb-2 md:mb-0 md:pb-0">
                        <Link to='/' className="hover:underline">Home</Link>
                    </li>
                    <li className="grid justify-center pb-2 mb-2 md:mb-0 md:pb-0">
                        <Link to='/extraction' className="hover:underline">Estrazioni</Link>
                    </li>
                    <li className="grid justify-center pb-2 mb-2 md:mb-0 md:pb-0">
                        {
                            isLogged ? <Link to='/turns' className="hover:underline">Turns</Link> :
                                <Link to='/login' className="hover:underline">Login</Link>
                        }
                    </li>
                    <li className="grid justify-center pb-2 mb-2 md:mb-0 md:pb-0">
                        {
                            isLogged &&
                            <Link to="/" className="hover:underline" onClick={handleLogout}>Logout</Link>
                        }
                    </li>
                </ul>
            </nav>
    )
}

export default Navbar;