import React from "react";

const AccesibillitySecond = ({children}) => {
    return (
        <div className={`h-full bg-table-head rounded-r-2xl ${route().current('product') ? ' py-1 pr-3' : 'flex-1'}`}>
            <div className={`h-full flex items-center justify-end space-x-3 whitespace-nowrap ${route().current('product') ? ' rounded-2xl' : 'rounded-bl-2xl bg-main-layout'}`}>
                {children}
            </div>
        </div>
    );
};

export default AccesibillitySecond;
