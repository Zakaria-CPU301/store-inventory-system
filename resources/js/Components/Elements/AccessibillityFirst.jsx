import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "@inertiajs/react";

const AccessibillityFirst = ({ dataFilters }) => {
    const [category, setCategory] = useState()

    const [keyword, setKeyword] = useState()
    
    const { post, data, setData } = useForm({
        discovery: [],
    });

    const reqChangeData = (e) => {
        e.preventDefault();

        setData('discovery', [category, keyword])
        post(route("balance.index"));
    };

    console.log([category, keyword]);
    

    return (
        <div
            className={`h-full ${dataFilters.length ? "" : " min-w-1/2"} flex items-center bg-table-head ${route().current("product.index") ? "rounded-l-2xl flex-1 py-0.5 pl-0.5" : "rounded-t-2xl px-5"}`}
        >
            <div
                className={`h-full w-full items-center flex ${route().current("product.index") ? "justify-center bg-main-layout rounded-2xl px-3" : ""}`}
            >
                <form
                    onSubmit={reqChangeData}
                    className="w-full flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none rounded-lg"
                >
                    {dataFilters.length ? (
                        <>
                            {/* <Button
                                type="submit"
                                {...(data.discovery === null
                                    ? {
                                          className:
                                              "bg-indigo-100 font-bold text-[bg-main-table]",
                                      }
                                    : {})}
                                clickFunc={() => setKeyword('asdlkj')}
                            >
                                semua
                            </Button> */}
                            <input type="text" name="" onChange={e => setKeyword(e.target.value)} id="" />
                            {dataFilters.map((dataFilter, index) => (
                                <Button
                                    type="submit"
                                    {...(dataFilter === data.category
                                        ? {
                                              className:
                                                  "bg-indigo-100 font-bold text-[bg-main-table]",
                                          }
                                        : {})}
                                    clickFunc={() =>
                                        setCategory(dataFilter)
                                    }
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
