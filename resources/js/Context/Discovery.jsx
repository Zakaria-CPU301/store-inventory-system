import { useForm, usePage, useRemember } from "@inertiajs/react";
import React, { createContext, useState } from "react";

export const DiscoveryContext = createContext();

const DiscoveryContextProvider = ({ children }) => {
    const { post, setData, processing, data } = useForm({
        discovery: [],
    });

    const { props } = usePage();

    const [keyword, setKeyword] = useState(null);
    
    const [category, setCategory] = useState(null);

    const [attribute, setAttribute] = useState(() => {
        return props.attribute ?? 'kategori';
    });

    const discoverySubmit = (e) => {
        e.preventDefault();

        setData("discovery", {
            keyword: keyword,
            category: category,
            attribute: attribute,
        });

        post(route(route().current()), { preserveScroll: true });
    };

    return (
        <DiscoveryContext.Provider
            value={{
                discoverySubmit,
                processing,
                discovery: data.discovery,
                category,
                setCategory,
                keyword,
                setKeyword,
                attribute,
                setAttribute,
            }}
        >
            {children}
        </DiscoveryContext.Provider>
    );
};

export default DiscoveryContextProvider;
