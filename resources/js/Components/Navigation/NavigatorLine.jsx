import { Link } from "@inertiajs/react";

export default function NavigatorLine({
    icon,
    routeName,
    pageName = null,
    amountNotif,
}) {
    return (
        <Link
            href={route(`${routeName}.index`)}
            className={`flex justify-between items-center text-white p-2 rounded-xl hover:bg-[rgb(30,37,66)] duration-300 ${routeName + ".index" === route().current() ? "bg-[rgb(29,37,73)]" : ""}`}
        >
            <div className="flex items-center space-x-3">
                <i className={`${icon} text-xl`}></i>
                <span className="font-bold capitalize">
                    {pageName ?? routeName}
                </span>
            </div>
            <div className="">{amountNotif}</div>
        </Link>
    );
}
