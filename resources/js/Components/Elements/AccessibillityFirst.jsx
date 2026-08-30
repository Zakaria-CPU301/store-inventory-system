import React, { useContext } from "react";
import Button from "./Button";
import { DiscoveryContext } from "@/Context/Discovery";

const AccessibillityFirst = ({ dataFilters }) => {
    const { discoverySubmit, setCategory, category, processing } =
        useContext(DiscoveryContext);

    return (
        <div
            className={`h-full flex items-center bg-table-head
                ${dataFilters.length ? "" : " min-w-1/2"} 
                ${
                    route().current("product.index")
                        ? "rounded-l-2xl flex-1 py-0.5 pl-0.5"
                        : "rounded-t-2xl px-5"
                }`}
        >
            <div
                className={`h-full w-full items-center flex ${route().current("product.index") ? "justify-center bg-main-layout rounded-2xl px-3" : ""}`}
            >
                <form
                    onSubmit={discoverySubmit}
                    className="w-full flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none rounded-lg"
                >
                    {dataFilters.length ? (
                        <>
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
                            {dataFilters.map((dataFilter, index) => (
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    {...(dataFilter === category
                                        ? {
                                              className:
                                                  "bg-indigo-100 font-bold text-[bg-main-table]",
                                          }
                                        : {})}
                                    clickFunc={() => setCategory(dataFilter)}
                                    key={index}
                                >
                                    {dataFilter}
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
