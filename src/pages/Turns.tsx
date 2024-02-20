import AddUsersButton from "../components/AddUsers";
import React, {useState} from "react";
import User from "../components/User";


const Turns = ({socket}: any) => {
    const [users, setUsers] = useState<JSX.Element[]>([<User key="user"/>]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let usersToSend: any[] = []

        for (const element of event.target) {
            if (element.type === 'text') {
                usersToSend = [element.value, ...usersToSend]
            }
        }
        socket.emit('people', JSON.stringify(usersToSend));
    }

    return (
        <div className="grid place-items-center h-screen">
            <form className="flex flex-col justify-center align-middle bg-[#fff7f2] p-4 rounded-2xl border-[1.5px] border-[#f25657]" onSubmit={handleSubmit}>
                <div className="text-center text-[#ff6666] text-[2rem]"><h2>Utenti</h2></div>
                {users.map((user: any) => user)}
                <AddUsersButton onClick={setUsers}/>
                <div className="text-center my-5">
                    <button className="bg-[#ff6666] hover:bg-[#f25657] text-white font-bold py-2 px-4 rounded" type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

export default Turns;