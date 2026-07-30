import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function NavigatorLine({ router, icon, pageName, amount }) {
    const { routeName } = usePage().props;

    return (
        <Link
            href={route(`${router}`)}
            className={`flex justify-between items-center text-white p-2 rounded-xl hover:bg-[rgb(30,37,66)] duration-300 ${routeName === router ? "bg-[rgb(29,37,73)]" : ""}`}
        >
            <div className="flex items-center space-x-3">
                <i className={icon}></i>
                <span className="font-bold capitalize">{pageName}</span>
            </div>
            <div className="">{amount}</div>
        </Link>
    );
}
