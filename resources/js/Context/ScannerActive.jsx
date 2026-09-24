import React, { createContext, useEffect, useState } from "react";

export const ScannerActiveContext = createContext();

const ScannerActive = ({ children }) => {
    const [show, setShow] = useState(true);

    return (
        <ScannerActiveContext.Provider value={{ show, setShow }}>
            {children}
        </ScannerActiveContext.Provider>
    );
};

export default ScannerActive;
