import React from "react";

const HeaderAccessibillity = ({ children, className }) => {
    return (
        <div
            className={`bg-[rgb(5,14,31)] flex sticky pt-2 top-16 h-18 max-w-full justify-between items-center ${className}`}
        >
            {children}
        </div>
    );
};

export default HeaderAccessibillity;
