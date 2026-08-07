import React from "react";

const FormOverlay = ({children}) => {
    return (
        <div className="w-full h-full p-4 overflow-y-scroll overscroll-y-contain scrollbar-thumb-blue-500">
            {children}
        </div>
    );
};

export default FormOverlay;
