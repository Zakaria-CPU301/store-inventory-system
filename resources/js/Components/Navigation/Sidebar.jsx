import NavigatorLine from "./NavigatorLine";

const Sidebar = () => {
    return (
        <div className="bg-linear-to-b from-[rgb(18,29,49)] to-[rgb(8,19,40)] left-0 top-16 sticky w-1/5 h-[calc(100vh-4rem)] overflow-x-hidden overscroll-none">
            <div className="flex flex-col space-y-3 py-5 px-2.5">
                <h1 className="font-bold text-xl text-white/60">Daftar</h1>
                <NavigatorLine
                    routeName="dashboard"
                    icon="bi bi-border-style"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="barang"
                    icon="bi bi-table"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="pulsa"
                    icon="bi bi-broadcast-pin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="kasbon"
                    icon="bi bi-list-check"
                    amountNotif="20"
                />

                <div className="h-0.75 w-full bg-white/40 rounded-full my-2.5"></div>

                <h1 className="font-bold text-xl text-white/60">Catatan</h1>
                <NavigatorLine
                    routeName="aktivitas"
                    icon="bi bi-calendar3-range"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="transaksi"
                    icon="bi bi-cash-coin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="grafik"
                    icon="bi bi-graph-up-arrow"
                    amountNotif="20"
                />
            </div>
        </div>
    );
};

export default Sidebar;
