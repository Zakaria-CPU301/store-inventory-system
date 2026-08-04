import React from "react";

const HeaderInfo = ({ children }) => {
    return <header className="flex mb-8 space-x-4 justify-between items-center">{children}</header>;
};

export default HeaderInfo;
