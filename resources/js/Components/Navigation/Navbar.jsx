import { DiscoveryContext } from "@/Context/Discovery";
import { Link, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

export default function Navbar({ toggleSidebar, focus }) {
    const user = usePage().props.auth.user;
    const { keyword, setKeyword, discoverySubmit, processing } =
        useContext(DiscoveryContext);

    const [searchFocus, setSearchFocus] = useState();
    useEffect(() => {
        document
            .getElementById("searchEngine")
            .addEventListener("focus", () => setSearchFocus(true));
        document
            .getElementById("searchEngine")
            .addEventListener("blur", () => setSearchFocus(false));
    });
    return (
        <>
            <nav className="z-20 w-full h-16 sticky top-0 flex justify-between items-center space-x-8 text-white bg-main-navbar ">
                <div className="h-full flex items-center space-x-5 pl-5 w-1/5">
                    <button onClick={toggleSidebar} className="cursor-pointer">
                        <i className="bi bi-list text-white text-3xl"></i>
                    </button>
                    <div className="flex text-lg space-x-0.5 h-full items-center">
                        <img
                            src="/storage/defaults/main_logo.png"
                            className="w-13.5 object-center"
                            alt=""
                        />
                        <span className="text-xl">
                            Warung
                            <span className="text-white/40 font-bold">
                                Dalis
                            </span>
                        </span>
                    </div>
                </div>
                <div className={`flex bg-black`}>
                    {usePage().props.routeName === "transaction" ? (
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                document.getElementById("scanner").focus();
                            }}
                            onTouchStart={(e) => {
                                e.preventDefault();
                                document.getElementById("scanner").focus();
                            }}
                            className={`flex items-center cursor-pointer py-1 px-2.5 space-x-2 rounded-lg text-2xl  ${focus ? "bg-amber-300 text-black" : "bg-red-600 text-white"}`}
                        >
                            <i className="bi bi-qr-code-scan"></i>
                            {focus ? (
                                <i className="bi bi-check-circle"></i>
                            ) : (
                                <i className="bi bi-x-circle"></i>
                            )}
                        </button>
                    ) : (
                        <Link
                            href={route("transaction.index")}
                            className={`flex items-center cursor-pointer py-1 px-2.5 space-x-2 rounded-lg text-2xl  ${focus ? "bg-amber-300 text-black" : "bg-red-600 text-white"}`}
                        >
                            <i className="bi bi-qr-code-scan"></i>
                            {focus ? (
                                <i className="bi bi-check-circle"></i>
                            ) : (
                                <i className="bi bi-x-circle"></i>
                            )}
                        </Link>
                    )}
                </div>
                <form
                    onSubmit={discoverySubmit}
                    className="flex-1 h-full items-center flex"
                >
                    <input
                        id="searchEngine"
                        type="text"
                        onChange={(e) => setKeyword(e.target.value)}
                        autoFocus
                        placeholder="Search"
                        className="bg-black w-full h-3/4 px-4 rounded-l-2xl border border-white/10 outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                        disabled={processing}
                        type="submit"
                        className={`bg-black outline-none ${searchFocus ? " ring-2 ring-white" : "border border-y border-r border-white/10"} rounded-r-2xl h-3/4 w-[10%] flex items-center justify-center cursor-pointer`}
                    >
                        <i className="bi bi-search text-lg"></i>
                    </button>
                </form>
                <div className="flex gap-5 h-full justify-between items-center pr-5">
                    <div className="flex gap-1">
                        <div className="rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 duration-300 cursor-pointer">
                            <div className="relative">
                                <i className="bi bi-bell-fill text-xl"></i>
                                <div className="absolute w-2.5 h-2.5 top-0 right-0 translate-x-0.5 bg-red-600 rounded-full"></div>
                            </div>
                        </div>
                        <div className="rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/50 duration-300 cursor-pointer">
                            <i className="bi bi-gear-fill text-xl"></i>
                        </div>
                    </div>

                    <div className="w-0.75 h-1/2 rounded-xl bg-white/40"></div>

                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <span className="font-bold">
                                {user.name
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((e) => `${e.slice(0, 4)}...`)
                                    .join(" ")}
                            </span>
                            <span className="capitalize text-sm text-right">
                                supervisor
                            </span>
                        </div>
                        {!user ? (
                            <i className="bi bi-person-circle text-3xl"></i>
                        ) : (
                            <img
                                src="/storage/defaults/leptop-chartup.webp"
                                className="w-12 rounded-full border-2 border-white/40"
                                alt="laptop"
                            />
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
