import React from "react";

// @ts-ignore
const ExtractedUser = ({turn}) => {
    return <div className="py-5 border-b-[0.5px] border-[#ff6666]">
        <strong>{turn.turn}</strong>: <span className="capitalize">{turn.name}</span>
    </div>
}

export default ExtractedUser;