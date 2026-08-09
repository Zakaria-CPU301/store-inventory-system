import React from "react";

const OverlayModal = ({ children, clickFunc }) => {
    return (
        <div className="z-99 flex flex-col justify-center items-center w-full h-screen backdrop-blur-md fixed top-0 left-0">
            <div onClick={clickFunc} className="absolute w-full h-full"></div>
            {children}
        </div>
    );
};

export default OverlayModal;
