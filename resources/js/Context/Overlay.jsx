import React, { createContext, useState } from "react";

export const OverlayContext = createContext();

const Overlay = ({ children }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(prev => !prev);
    };

    return (
        <OverlayContext.Provider value={{ showOverlay, toggleOverlay }}>
            {children}
        </OverlayContext.Provider>
    );
};

export default Overlay;
