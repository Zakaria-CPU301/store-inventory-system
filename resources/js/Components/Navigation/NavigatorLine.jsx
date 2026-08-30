import { Link } from "@inertiajs/react";
import { useContext, useState } from "react";
import Scanning from "../Partials/Scanning";
import { ModalContext } from "@/Context/Modal";
import Modal from "@/Context/Modal";
import Card from "../Partials/Card";

const NavigatorLine = ({ icon, routeName = null, pageName, amountNotif }) => {
    const { setModalContent, setModal } = useContext(ModalContext);

    return (
        <div
            className={`flex text-white rounded-xl overflow-hidden hover:bg-[rgb(30,37,66)] duration-300
                ${routeName + ".index" === route().current() ? "bg-[rgb(29,37,73)]" : ""}`}
        >
            {routeName ? (
                <Link
                    href={route(`${routeName}.index`)}
                    className={`flex w-full items-center p-2 space-x-3`}
                >
                    <i className={`bi bi-${icon} text-xl`}></i>
                    <span className="font-bold capitalize flex-1">
                        {pageName}
                    </span>
                    <div className="">{amountNotif}</div>
                </Link>
            ) : (
                <>
                    <div
                        className="flex w-full items-center p-2 space-x-3 cursor-pointer"
                        onClick={() => {
                            setModal(prev => !prev);
                            setModalContent(() => (
                                <Card className="bg-powderblue w-full max-w-[90%] h-full max-h-[80vh] p-4">
                                    <Scanning />
                                </Card>
                            ));
                        }}
                    >
                        <i className={`bi bi-${icon} text-xl`}></i>
                        <span className="font-bold capitalize">{pageName}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default NavigatorLine;
