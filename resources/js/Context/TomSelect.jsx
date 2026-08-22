import React, { createContext, useContext, useEffect } from "react";

const TomSelectContext = createContext();

useEffect(() => {
    if (!showOverlay) return;
    new TomSelect("#select-customer-name", {
        create: true,
        sortField: {
            field: "text",
            direction: "asc",
        },
    });
}, [showOverlay])

const TomSelect = ({ children }) => {
    return (
        <TomSelectContext.Provider value={{}}>
            {children}
        </TomSelectContext.Provider>
    );
};

export default TomSelect;
