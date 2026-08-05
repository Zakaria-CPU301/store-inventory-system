import React from "react";

const AccesibillitySecond = ({children}) => {
    return (
        <div className="h-full flex-1 bg-table-head">
            <div className={`h-full flex items-center justify-end space-x-3 pl-3 whitespace-nowrap ${route().current('product') ? '' : 'rounded-bl-2xl'} bg-main-layout`}>
                {children}
            </div>
        </div>
    );
};

export default AccesibillitySecond;
