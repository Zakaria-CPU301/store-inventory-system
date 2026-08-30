import React from "react";

const Card = ({children, className}) => {
    return (
        <div className={`flex flex-col justify-between rounded-2xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;
