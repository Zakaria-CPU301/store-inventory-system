import React, { useContext } from "react";
import Button from "./Button";
import { DiscoveryContext } from "@/Context/Discovery";
import { usePage } from "@inertiajs/react";
import Product from "@/Pages/Main/Product";

const AccessibillityFirst = ({ dataFilters, all = false }) => {
    const {
        discoverySubmit,
        processing,
        setCategory,
        category,
        attribute,
        setAttribute,
        invoice,
        setInvoice,
    } = useContext(DiscoveryContext);
    const { routeName } = usePage().props;
    return (
        <div
            className={`overflow-x-scroll scrollbar-none h-full flex items-center bg-table-head
                ${dataFilters.length ? "" : " min-w-1/2"} 
                ${
                    routeName === "product"
                        ? "rounded-l-2xl flex-1 py-0.5 pl-0.5"
                        : "rounded-t-2xl pl-3"
                }`}
        >
            <div
                className={`h-full w-full items-center flex ${routeName === "product" ? "justify-center bg-main-layout rounded-2xl px-3" : ""}`}
            >
                <form
                    onSubmit={discoverySubmit}
                    className="w-full flex whitespace-nowrap rounded-lg"
                >
                    {dataFilters.length ? (
                        <>
                            {all && (
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    {...(category === null
                                        ? {
                                              className:
                                                  "bg-indigo-100 font-bold text-[bg-main-table]",
                                          }
                                        : {})}
                                    clickFunc={() => setCategory(null)}
                                >
                                    semua
                                </Button>
                            )}
                            {dataFilters.map((dataFilter, index) => (
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    {...(dataFilter === category ||
                                    dataFilter === attribute ||
                                    dataFilter === invoice
                                        ? {
                                              className:
                                                  "bg-indigo-100 font-bold text-[bg-main-table]",
                                          }
                                        : {})}
                                    clickFunc={() => {
                                        if (routeName === "balance")
                                            setCategory(dataFilter);
                                        else if (routeName === "attribute")
                                            setAttribute(dataFilter);
                                        else if (routeName === "transaction")
                                            setInvoice(dataFilter);
                                        document
                                            .getElementById("scanner")
                                            .focus();
                                    }}
                                    className={`mr-3 font-semibold ${
                                        dataFilter === category ||
                                        dataFilter === attribute ||
                                        dataFilter === invoice
                                            ? "bg-indigo-100 font-bold text-black"
                                            : "text-indigo-100 bg-main-table"
                                    }`}
                                    key={index}
                                >
                                    {routeName === "transaction"
                                        ? dataFilter.split(".")[0]
                                        : dataFilter}
                                </Button>
                            ))}
                        </>
                    ) : (
                        <div className="space-x-2 text-white/75 font-semibold flex w-full justify-center">
                            <i className="bi bi-collection text-lg"></i>
                            <span>Tidak ada filter kategori data...</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AccessibillityFirst;
