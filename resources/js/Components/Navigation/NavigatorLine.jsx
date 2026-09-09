import { Link } from "@inertiajs/react";

const NavigatorLine = ({ icon, routeName = null, pageName, amountNotif }) => {
    return (
        <div
            className={`flex text-white rounded-xl overflow-hidden hover:bg-[rgb(30,37,66)] duration-300
                ${routeName + ".index" === route().current() ? "bg-[rgb(29,37,73)]" : ""}`}
        >
            <Link
                href={route(`${routeName}.index`)}
                className={`flex w-full items-center p-2 space-x-3`}
            >
                <i className={`bi bi-${icon} text-xl`}></i>
                <span className="font-bold capitalize flex-1">{pageName}</span>
                <div className="">{amountNotif}</div>
            </Link>
        </div>
    );
};

export default NavigatorLine;
