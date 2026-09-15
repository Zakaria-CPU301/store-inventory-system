import { Link } from "@inertiajs/react";
import Scanning from "../Partials/Scanning";
import Card from "../Partials/Card";

const NavigatorLine = ({
    icon,
    routeName = null,
    pageName,
    amountNotif,
    modal,
    setModal,
    setModalContent,
}) => {
    return (
        <div
            className={`flex text-white rounded-xl overflow-hidden hover:bg-[rgb(30,37,66)] duration-300
                ${routeName + ".index" === route().current() ? "bg-[rgb(29,37,73)]" : ""}`}
        >
            {!setModal ? (
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
                <div
                    onClick={() => {
                        setModal(true);
                        setModalContent(
                            <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                                <Scanning modal={modal} />
                            </Card>,
                        );
                    }}
                    className="flex w-full items-center p-2 space-x-3"
                >
                    <i className={`bi bi-${icon} text-xl`}></i>
                    <span className="font-bold capitalize flex-1">
                        {pageName}
                    </span>
                </div>
            )}
        </div>
    );
};

export default NavigatorLine;
