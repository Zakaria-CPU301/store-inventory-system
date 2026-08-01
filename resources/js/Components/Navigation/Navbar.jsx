import FadeWhite from "../elements/FadeWhite";

export default function Navbar({ auth }) {
    return (
        <>
            <nav className="w-full h-16 sticky top-0 flex justify-between items-center space-x-8 text-white bg-[rgb(3,8,26)] z-50">
                <div className="h-full flex items-center space-x-5 pl-5 w-1/5">
                    <i className="bi bi-list text-white text-3xl"></i>
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
                <div className="flex-1 h-full items-center flex">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search"
                        className="bg-black w-full h-3/4 px-4 rounded-l-2xl focus:outline-none focus:border-2 focus:border-white"
                    />
                    <div className="bg-black border-l-2 border-white/10 rounded-r-2xl h-3/4 w-[10%] flex items-center justify-center cursor-pointer">
                        <i className="bi bi-search text-lg"></i>
                    </div>
                </div>
                <div className="flex gap-5 h-full justify-between items-center pr-5">
                    <div className="flex gap-1">
                        <FadeWhite>
                            <div className="relative">
                                <i className="bi bi-bell-fill text-xl"></i>
                                <div className="absolute w-2.5 h-2.5 top-0 right-0 translate-x-0.5 bg-red-600 rounded-full"></div>
                            </div>
                        </FadeWhite>
                        <FadeWhite>
                            <i className="bi bi-gear-fill text-xl"></i>
                        </FadeWhite>
                    </div>

                    <div className="w-0.75 h-1/2 rounded-xl bg-white/40"></div>

                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <span className="font-bold">
                                {/* {{Str::limit($fullname[0], 8)}} {{Str::limit($fullname[1], 8)}} */}
                            </span>
                            <span className="capitalize text-sm text-right">
                                supervisor
                            </span>
                        </div>
                        {/* {auth.user ? (
                            <i className="bi bi-person-circle text-3xl"></i>
                        ) : (
                            )} */}
                        <img
                            src="/storage/defaults/leptop-chartup.webp"
                            className="w-12 rounded-full border-2 border-white/40"
                            alt="laptop"
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}
