import React from "react";

const HeaderAccessibillity = ({ children, className }) => {
    return (
        <div
            className={`bg-[rgb(5,14,31)] flex sticky top-16 h-16 w-full justify-between ${className}`}
        >
            {children}
        </div>
    );
};

export default HeaderAccessibillity;
