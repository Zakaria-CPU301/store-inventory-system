import React from "react";

const HeaderDesc = ({title, desc}) => {
    return (
        <div className="flex-1 space-y-5 text-white self-start">
            <h1 className="text-3xl font-extrabold capitalize">{title}</h1>
            <p>
                {desc}
            </p>
        </div>
    );
};

export default HeaderDesc;
