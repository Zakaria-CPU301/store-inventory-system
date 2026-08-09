import NavigatorLine from "./NavigatorLine";

const Sidebar = () => {
    return (
        <div className="h-[calc(100vh-4rem)] w-1/5 bg-linear-to-b from-[rgb(18,29,49)] to-[rgb(8,19,40)] left-0 top-16 sticky overflow-auto scrollbar-thumb-purple-400/50 scrollbar-thin scrollbar-gutter-stable overscroll-contain">
            <div className="flex flex-col space-y-3 py-5 px-2.5">
                <h1 className="font-bold text-xl text-white/60">Utama</h1>
                <NavigatorLine
                    routeName="dashboard"
                    icon="bi bi-border-style"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="product"
                    pageName="barang"
                    icon="bi bi-boxes"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="balance"
                    pageName="pulsa"
                    icon="bi bi-broadcast-pin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="category"
                    pageName="kategori"
                    icon="bi bi-collection"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="customer"
                    pageName="pelanggan"
                    icon="bi bi-people"
                    amountNotif="20"
                />
                {/* <NavigatorLine
                    routeName="boarding"
                    pageName="kontrakan"
                    icon="bi bi-houses"
                    amount="20"
                />
                <NavigatorLine
                    routeName="debt"
                    pageName="kasbon"
                    icon="bi bi-person-fill-exclamation"
                    amount="20"
                /> */}

                <div className="h-0.75 w-full bg-white/40 rounded-full my-2.5"></div>

                <h1 className="font-bold text-xl text-white/60">Catatan</h1>

                {/* <NavigatorLine
                    routeName="chart"
                    pageName="grafik"
                    icon="bi bi-graph-up-arrow"
                    amount="20"
                />
                <NavigatorLine
                    routeName="deposit"
                    pageName="titipan"
                    icon="bi bi-minecart-loaded"
                    amount="20"
                />
                <NavigatorLine
                    routeName="product"
                    pageName="transaksi"
                    icon="bi bi-cash-coin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="activity"
                    pageName="log aktivitas"
                    icon="bi bi-clock-history"
                    amount="20"
                /> */}
            </div>
        </div>
    );
};

export default Sidebar;
