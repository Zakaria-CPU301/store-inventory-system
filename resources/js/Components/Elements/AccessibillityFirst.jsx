import React from "react";
import Button from "./Button";

const AccessibillityFirst = ({dataFilter}) => {
    return (
        <div className={`h-full px-5 min-w-0 flex items-center ${route().current('product') ? 'rounded-2xl' : 'rounded-t-2xl'}  bg-table-head`}>
            <div className="flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none">
                {dataFilter.map((data, index) => (
                    <Button key={index}>{data}</Button>
                ))}
            </div>
        </div>
    );
};

export default AccessibillityFirst;
