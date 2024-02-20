import React, {useEffect} from "react";
import '../pages/extraction.css'
import ExtractedUser from "../components/ExtractedUser";




const Extraction = ({messages, setMessages, setIsExtracted, socket}: any) => {


    useEffect(() => {
        // Listen for incoming messages
        socket.on('people', (msg: string) => {
            console.log(msg)
            // @ts-ignore
            setMessages(JSON.parse(msg));
            setIsExtracted(true)
        });
    });

    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col justify-center align-middle bg-[#fff7f2] m-10 p-4 rounded-2xl w-64 border-[1.5px] border-[#f25657]">
                {messages.map((turn: any, index: number) => (
                    <div key={index} className={`delayed-${index} item`}>
                        <ExtractedUser turn={turn}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Extraction;