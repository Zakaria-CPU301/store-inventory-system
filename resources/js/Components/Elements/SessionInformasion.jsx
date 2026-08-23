import React from "react";
import { usePage } from "@inertiajs/react";

const SessionInformasion = ({ message, recentlySuccessful = false }) => {
    const { flash } = usePage();

    return (
        <>
            <div
                className={`${recentlySuccessful ? "opacity-100 translate-16" : "opacity-0"} ${flash.classname ?? "bg-[rgb(66,57,76)]"} flex items-center gap-2 translate-0 pointer-events-none rounded-2xl duration-300 fixed top-0 z-100 translate-x-1/2 right-1/2 p-3 text-indigo-50 font-semibold capitalize`}
            >
                <i className={`bi bi-${flash.icon} text-lg`}></i>
                <div className="">{flash.success}</div>
            </div>
        </>
    );
};

export default SessionInformasion;
