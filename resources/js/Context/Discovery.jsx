import { useForm } from "@inertiajs/react";
import React, { createContext, useState } from "react";

export const DiscoveryContext = createContext();

const DiscoveryContextProvider = ({ children }) => {
    const { post, setData, processing, data } = useForm({
        discovery: [],
    });

    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState(null);
    
    const discoverySubmit = (e) => {
        e.preventDefault();

        setData("discovery", [keyword, category]);

        post(route(route().current()), {preserveScroll: true});
    };

    return (
        <DiscoveryContext.Provider
            value={{ discoverySubmit, category, setCategory, keyword, setKeyword, processing, discovery: data.discovery }}
        >
            {children}
        </DiscoveryContext.Provider>
    );
};

export default DiscoveryContextProvider;
