import React from "react";

const FormOverlay = ({children, handleSubmitForm}) => {
    return (
        <form onSubmit={handleSubmitForm} className="w-full h-full p-4 overflow-y-scroll overscroll-y-contain scrollbar-thumb-blue-500">
            {children}
        </form>
    );
};

export default FormOverlay;
