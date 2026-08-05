import React from "react";

const HeaderAccessibillity = ({ children, className }) => {
    return (
        <div
            className={`bg-[rgb(5,14,31)] flex sticky pt-2 top-16 h-18 z-50 max-w-full justify-between items-center ${route().current('product') ? 'rounded-b-2xl' : ''} ${className}`}
        >
            {children}
        </div>
    );
};

export default HeaderAccessibillity;
