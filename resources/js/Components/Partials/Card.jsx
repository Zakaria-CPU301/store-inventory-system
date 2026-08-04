import React from "react";

const Card = ({children, className}) => {
    return (
        <div className={`rounded-2xl relative flex flex-col justify-between p-5 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
