import { useForm } from "@inertiajs/react";
import React, { createContext, useContext } from "react";

export const FormProductContext = createContext();

const FormProduct = (children) => {
    const {
        data,
        setData,
        post,
        put,
        errors,
        recentlySuccessful,
        processing,
        clearErrors,
    } = useForm({
        id: null,
        customer: "",
        number: "",
        category: "",
        discovery: [],
    });

    const handleCreate = (e) => {
        e.preventDefault();

        post(route("balance.store"));
    };
    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("balance.update"), {
            preserveScroll: true,
        });
    };
    const handleDestroy = (e) => {
        e.preventDefault();

        post(route("balance.destroy"), {
            preserveState: false,
            preserveScroll: true,
        });
    };
    return (
        <FormProduct.Provider
            value={{
                handleCreate,
                handleUpdate,
                handleDestroy,
                data,
                setData,
                errors,
                processing,
                clearErrors,
                recentlySuccessful,
            }}
        >
            {children}
        </FormProduct.Provider>
    );
};

const Create = () => {
    const { data, setData, handleCreate } = useContext(FormProductContext);
    return (
        <div className="flex w-full justify-center mt-5">
            <Button
                type="handle"
                className={`flex gap-5 items-center text-xl bg-sky-300 font-semibold`}
                disabled={processing}
            >
                kirim
                <LoadingSession processing={processing} />
            </Button>
        </div>
    );
};

FormProduct.Create = Create;
export default FormProduct;
