import React from "react";
import Button from "./Button";

const AccessibillityFirst = ({ dataFilter }) => {
    return (
        <div
            className={`h-full min-w-0 flex items-center bg-table-head ${route().current("product") ? "rounded-l-2xl flex-1 py-1 pl-1 pr-3" : "rounded-t-2xl px-5"}`}
        >
            <div className={`${route().current('product') ? 'flex h-full w-full items-center justify-center bg-main-layout rounded-2xl' : ''}`}>
                <div className="flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none">
                    {dataFilter.map((data, index) => (
                        <Button key={index}>{data}</Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccessibillityFirst;
