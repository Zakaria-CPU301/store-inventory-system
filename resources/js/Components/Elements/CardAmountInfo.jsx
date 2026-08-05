import React from "react";

const CardAmountInfo = ({label, amount = 0, unit}) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <span className="text-white/75 text-xl">{label}</span>
            <span className="text-xl text-white">
                <b className="text-3xl">{amount}</b> {unit}
            </span>
        </div>
    );
};

export default CardAmountInfo;
