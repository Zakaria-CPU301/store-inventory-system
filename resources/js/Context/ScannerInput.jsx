import React, { createContext, useState } from "react";

export const ScannerInputContext = createContext();

const ScannerInput = ({ children }) => {
    const [code, setCode] = useState("");

    console.log(code);

    return (
        <ScannerInputContext.Provider value={{ code, setCode }}>
            {children}
        </ScannerInputContext.Provider>
    );
};

export default ScannerInput;
