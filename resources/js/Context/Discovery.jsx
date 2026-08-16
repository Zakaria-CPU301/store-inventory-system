import { useForm } from "@inertiajs/react";
import React, { createContext, useState } from "react";

export const DiscoveryContext = createContext();

const DiscoveryContextProvider = ({ children }) => {
    const { post, data, setData } = useForm({
        discovery: [],
    });

    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState(null);

    const discoverySubmit = (e) => {
        e.preventDefault();

        setData('discovery', [keyword, category])

        post(route(route().current()));
    };

    return (
        <DiscoveryContext.Provider value={{ discoverySubmit, category, setCategory, setKeyword }}>
            {children}
        </DiscoveryContext.Provider>
    );
};

export default DiscoveryContextProvider;
