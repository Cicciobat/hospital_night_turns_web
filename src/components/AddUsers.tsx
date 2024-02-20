import User from "./User";

// @ts-ignore
const AddUsersButton = ({onClick}) => {

    return (<div className="text-center my-5">
        <button
            className="bg-[#ff6666] hover:bg-[#f25657] text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={() => onClick((prev: any) => [<User/>, ...prev])}>
            <i className="fa-solid fa-plus"></i>
        </button>
    </div>)
}

export default AddUsersButton;