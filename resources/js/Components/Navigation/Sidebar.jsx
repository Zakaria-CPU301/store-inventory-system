import NavigatorLine from "./NavigatorLine";

const Sidebar = () => {
    return (
        <div className="h-[calc(100vh-4rem)] w-1/5 bg-linear-to-b from-[rgb(18,29,49)] to-[rgb(8,19,40)] left-0 top-16 sticky overflow-auto scrollbar-thumb-purple-400/50 scrollbar-thin scrollbar-gutter-stable overscroll-contain">
            <div className="flex flex-col space-y-3 py-5 px-2.5">
                <NavigatorLine
                    pageName="pemindaian barang"
                    icon="upc-scan"
                />

                <h1 className="font-bold text-xl text-white/60">Utama</h1>
                <NavigatorLine
                    pageName="dasbor"
                    routeName="dashboard"
                    icon="border-style"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="product"
                    pageName="barang"
                    icon="boxes"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="balance"
                    pageName="pulsa"
                    icon="broadcast-pin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="category"
                    pageName="kategori"
                    icon="collection"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="customer"
                    pageName="pelanggan"
                    icon="people"
                    amountNotif="20"
                />
                {/* <NavigatorLine
                    routeName="boarding"
                    pageName="kontrakan"
                    icon="houses"
                    amount="20"
                />
                <NavigatorLine
                    routeName="debt"
                    pageName="kasbon"
                    icon="person-fill-exclamation"
                    amount="20"
                /> */}

                <div className="h-0.75 w-full bg-white/40 rounded-full my-2.5"></div>

                <h1 className="font-bold text-xl text-white/60">Catatan</h1>

                {/* <NavigatorLine
                    routeName="chart"
                    pageName="grafik"
                    icon="graph-up-arrow"
                    amount="20"
                />
                <NavigatorLine
                    routeName="deposit"
                    pageName="titipan"
                    icon="minecart-loaded"
                    amount="20"
                />
                <NavigatorLine
                    routeName="product"
                    pageName="transaksi"
                    icon="cash-coin"
                    amountNotif="20"
                />
                <NavigatorLine
                    routeName="activity"
                    pageName="log aktivitas"
                    icon="clock-history"
                    amount="20"
                /> */}
            </div>
        </div>
    );
};

export default Sidebar;
