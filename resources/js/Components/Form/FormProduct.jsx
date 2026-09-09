import { useForm } from "@inertiajs/react";
import React, { createContext, useContext, useEffect } from "react";
import Button from "../Elements/Button";
import FormOverlay from "../Partials/FormOverlay";
import InputLabel from "../Elements/InputLabel";
import InputError from "../Elements/InputError";
import LoadingSession from "../Elements/LoadingSession";

export const FormProductContext = createContext();

const FormProduct = ({ children, setEndForm }) => {
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

    useEffect(() => setEndForm(recentlySuccessful), [recentlySuccessful]);

    return (
        <FormProductContext.Provider
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
        </FormProductContext.Provider>
    );
};

const Create = () => {
    const { data, setData, handleCreate, processing } = useContext(FormProductContext);
    return (
        <FormOverlay submitForm={handleCreate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <div className="">
                    <InputLabel value={"Nama Pelanggan"} />
                    <select
                        className="select-create"
                        defaultValue={data.customer}
                        onChange={(e) => {
                            setData("customer", e.target.value);
                            clearErrors("customer");
                        }}
                        data-placeholder="Pilih atau Tambah"
                    >
                        <option value="">Pilih atau Tambah</option>
                        {datasFormulir.cust.map((customerData, i) => (
                            <option value={customerData.id} key={i}>
                                {customerData.cust_name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.customer} />
                </div>
            </div>

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
        </FormOverlay>
    );
};

FormProduct.Create = Create;
export default FormProduct;
