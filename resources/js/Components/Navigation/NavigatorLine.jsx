export default function NavigatorLine({icon, routeName, amountNotif}) {
    return (
        <a
            href=""
            className="flex justify-between items-center text-white bg-[rgb(30,37,66)] p-2 rounded-xl"
        >
            <div className="flex items-center space-x-3">
                <i className={icon}></i>
                <span className="font-bold capitalize">{ routeName }</span>
            </div>
            <div className="">{ amountNotif }</div>
        </a>
    );
}
