import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import {Button, Card, Collapse} from "@material-tailwind/react";
import {useState} from "react";

const Header = ({isLogged, setIsLogged}: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const toggleOpen = () => setIsOpen((cur) => !cur);

    return (
        <header className="px-10 bg-[#fff7f2] sticky top-0 py-6 border-b-[1.5px] border-[#f25657]">
            <div className="flex flex-row" >
                <div><Link to="/" className="text-[2.5rem] text-[#f25657]"> Night turns </Link></div>
                <div className="ms-auto my-auto hidden md:block"><Navbar isLogged={isLogged} setIsLogged={setIsLogged}/></div>
                <div className="ms-auto my-auto md:hidden sm:block grid content-center justify-center">
                    <Button className="text-[#f25657] text-[1.8rem]" onClick={toggleOpen} placeholder={undefined}><i
                        className="fa-solid fa-bars"></i></Button>
                </div>
            </div>
            <Collapse open={isOpen}>
                <Card className="my-2 mx-auto" placeholder={undefined}>
                    {isOpen && <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />}
                </Card>
            </Collapse>
        </header>
    )
}

export default Header;