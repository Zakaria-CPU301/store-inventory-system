import NavigatorLine from "./NavigatorLine";

const Sidebar = () => {
    
    return (
        <div className="bg-linear-to-b from-[rgb(18,29,49)] to-[rgb(8,19,40)] left-0 top-16 sticky w-1/5 h-[calc(100vh-4rem)] overflow-hidden overscroll-contain">
            <div className="flex flex-col space-y-3 py-5 px-2.5">
                <h1 className="font-bold text-xl text-white/60">Daftar</h1>
                <NavigatorLine
                    router="dashboard"
                    pageName="dashboard"
                    icon="bi bi-border-style"
                    amount="20"
                />
                <NavigatorLine
                    router="product"
                    pageName="barang"
                    icon="bi bi-table"
                    amount="20"
                />
                <NavigatorLine
                    router="balance"
                    pageName="pulsa"
                    icon="bi bi-broadcast-pin"
                    amount="20"
                />
                <NavigatorLine
                router="debt"
                    pageName="kasbon"
                    icon="bi bi-list-check"
                    amount="20"
                />

                <div className="h-0.75 w-full bg-white/40 rounded-full my-2.5"></div>

                <h1 className="font-bold text-xl text-white/60">Catatan</h1>
                <NavigatorLine
                router="activity"
                    pageName="aktivitas"
                    icon="bi bi-calendar3-range"
                    amount="20"
                />
                <NavigatorLine
                router="transaction"
                    pageName="transaksi"
                    icon="bi bi-cash-coin"
                    amount="20"
                />
                <NavigatorLine
                router="chart"
                    pageName="grafik"
                    icon="bi bi-graph-up-arrow"
                    amount="20"
                />
            </div>
        </div>
    );
};

export default Sidebar;
