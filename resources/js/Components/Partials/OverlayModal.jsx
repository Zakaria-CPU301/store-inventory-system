import React from "react";

const OverlayModal = ({ children, clickFunc }) => {
    return (
        <div className="z-50 flex flex-col justify-center items-center inset-0 backdrop-blur-md fixed">
            <div
                onClick={clickFunc}
                className="absolute inset-0 -z-1"
            ></div>
            {children}
        </div>
    );
};

export default OverlayModal;
