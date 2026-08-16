import { DiscoveryContext } from "@/Context/Discovery";
import { usePage } from "@inertiajs/react";
import { useContext, useState } from "react";

export default function Navbar({ toggleSidebar }) {
    const user = usePage().props.auth.user;
    const { setKeyword, discoverySubmit } = useContext(DiscoveryContext);

    return (
        <>
            <nav className="w-full h-16 sticky top-0 flex justify-between items-center space-x-8 text-white bg-main-navbar z-50">
                <div className="h-full flex items-center space-x-5 pl-5 w-1/5">
                    <button onClick={toggleSidebar}>
                        <i className="bi bi-list text-white text-3xl"></i>
                    </button>
                    <div className="flex text-lg space-x-2">
                        <img
                            src="/storage/defaults/logo_light.svg"
                            className="w-8"
                            alt=""
                        />
                        <span>
                            Warung
                            <span className="text-white/40 font-bold">
                                Dalis
                            </span>
                        </span>
                    </div>
                </div>
                <form
                    onSubmit={discoverySubmit}
                    className="flex-1 h-full items-center flex"
                >
                    <input
                        type="text"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search"
                        className="bg-black w-full h-3/4 px-4 rounded-l-2xl focus:outline-none focus:border-2 focus:border-white"
                    />
                    <button
                        type="submit"
                        className="bg-black border-l-2 border-white/10 rounded-r-2xl h-3/4 w-[10%] flex items-center justify-center cursor-pointer"
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
