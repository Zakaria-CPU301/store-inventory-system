import React from "react";
import Button from "./Button";

const AccessibillityFirst = ({ dataFilter }) => {
    return (
        <div
            className={`h-full min-w-0 flex items-center bg-table-head ${route().current("product") ? "rounded-l-2xl flex-1 py-0.5 pl-0.5" : "rounded-t-2xl px-5"}`}
        >
            <div className={` h-full w-full items-center flex ${route().current('product') ? 'justify-center bg-main-layout rounded-2xl px-3' : ''}`}>
                <div className="flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none rounded-lg">
                    {dataFilter.map((data, index) => (
                        <Button key={index}>{data}</Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccessibillityFirst;
