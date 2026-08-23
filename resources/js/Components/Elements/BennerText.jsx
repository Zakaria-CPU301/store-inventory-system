import React from "react";

const BennerText = ({label, dataContent}) => {
    return (
        <div className="rounded-lg flex overflow-x-hidden shadow-[0_0_4px] shadow-blue-400">
            <div className="bg-blue-400 shrink-0 w-2"></div>
            <div className="flex flex-col px-4 py-2">
                <span className="font-bold text-lg capitalize">{label}</span>
                <span>{dataContent}</span>
            </div>
        </div>
    );
};

export default BennerText;
