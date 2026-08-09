import React from "react";
import Button from "./Button";
import { Link } from "@inertiajs/react";

const AccessibillityFirst = ({ dataFilter }) => {
    return (
        <div
            className={`h-full min-w-1/2 flex items-center bg-table-head ${route().current("product.index") ? "rounded-l-2xl flex-1 py-0.5 pl-0.5" : "rounded-t-2xl px-5"}`}
        >
            <div
                className={`h-full w-full items-center flex ${route().current("product.index") ? "justify-center bg-main-layout rounded-2xl px-3" : ""}`}
            >
                <div className="w-full flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none rounded-lg">
                    {dataFilter.length ? (
                        dataFilter.map((data, index) => (
                            <Button key={index}>{data}</Button>
                        ))
                    ) : (
                            <Link
                                href={route("category.index")}
                                className="space-x-2 text-white font-semibold flex w-full justify-center"
                            >
                                <i className="bi bi-collection text-lg"></i>
                                <span>Tambahkan filter kategori data.</span>
                            </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccessibillityFirst;
