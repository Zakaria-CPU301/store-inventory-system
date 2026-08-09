import React from "react";

const ModalHeader = ({ title, clickFunc }) => {
    return (
        <div className="flex w-full justify-between items-center sticky top-0 p-4 border-b border-blue-400">
            <div className="text-2xl capitalize font-extrabold text-black/75">
                {title}
            </div>
                <div className="flex-1 text-center"></div>
            <div
                onClick={clickFunc}
                className="w-10 h-10 grid place-items-center hover:bg-red-700/75 hover:text-white hover:rotate-180 cursor-pointer duration-300 rounded-full"
            >
                <i className="bi bi-x text-3xl"></i>
            </div>
        </div>
    );
};

export default ModalHeader;
