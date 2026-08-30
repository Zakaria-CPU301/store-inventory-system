import { useForm } from "@inertiajs/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import FormOverlay from "../Partials/FormOverlay";
import InputLabel from "../Elements/InputLabel";
import InputError from "../Elements/InputError";
import TextInput from "../Elements/TextInput";
import LoadingSession from "../Elements/LoadingSession";
import Button from "../Elements/Button";
import SessionInformasion from "../Elements/SessionInformasion";
import TomSelect from "tom-select";
import BennerText from "../Elements/BennerText";
import { DiscoveryContext } from "@/Context/Discovery";

export const FormBalanceContext = createContext();

const FormBalance = ({ children }) => {
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

    const submitCreate = (e) => {
        e.preventDefault();

        post(route("balance.store"));
    };
    const submitUpdate = (e) => {
        e.preventDefault();

        put(route("balance.update"), {
            preserveScroll: true
        });
    };
    const submitDestroy = (e) => {
        e.preventDefault();

        post(route("balance.destroy"), {
            preserveState: false,
            preserveScroll: true
        });
    };

    useEffect(() => {
        const selectCreate = document.querySelectorAll(".select-create");
        const selectUncreate = document.querySelectorAll(".select-uncreate");

        if (selectCreate.length) {
            selectCreate.forEach((e) => {
                new TomSelect(e, {
                    create: true,
                    sortField: {
                        field: "text",
                        direction: "asc",
                    },
                });
            });
        }

        if (selectUncreate.length) {
            selectUncreate.forEach((e) => {
                new TomSelect(e, {
                    create: false,
                    sortField: {
                        field: "text",
                        direction: "asc",
                    },
                });
            });
        }
    }, []);

    return (
        <FormBalanceContext.Provider
            value={{
                submitCreate,
                submitUpdate,
                submitDestroy,
                data,
                setData,
                errors,
                processing,
                clearErrors,
                recentlySuccessful
            }}
        >
            <SessionInformasion recentlySuccessful={recentlySuccessful} />
            {children}
        </FormBalanceContext.Provider>
    );
};

const Create = ({ datasFormulir }) => {
    const { submitCreate, data, setData, errors, processing, clearErrors } =
        useContext(FormBalanceContext);

    return (
        <FormOverlay handleSubmitForm={submitCreate}>
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
                <div className="">
                    <InputLabel value={"Nomor Deposit"} />
                    <select
                        value={data.number}
                        onChange={(e) => {
                            setData("number", e.target.value);
                            clearErrors("number");
                        }}
                        className="select-create capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Pilih Nomor Deposit</option>
                        {datasFormulir.numCat.map((numberData, i) => (
                            <option value={numberData.number.number} key={i}>
                                {numberData.number.number}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.number} />
                </div>
                <div className="">
                    <select
                        value={data.category}
                        onChange={(e) => {
                            setData("category", e.target.value);
                            clearErrors("category");
                        }}
                        className="select-uncreate capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Pilih Kategori Produk</option>
                        <option value="pulsa">Pulsa</option>
                        <option value="dana">Dana</option>
                        <option value="paket data">Paket Data</option>
                        <option value="token">Token</option>
                    </select>
                    <InputError message={errors.category} />
                </div>
            </div>

            <div className="flex w-full justify-center mt-5">
                <Button
                    type="submit"
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

const Edit = ({ datasFormulir, dataEdit }) => {
    const { submitUpdate, data, setData, errors, processing, clearErrors } =
        useContext(FormBalanceContext);

        const {discovery} = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataEdit.id);
        setData("customer", dataEdit.customers.cust_name);
        setData("number", dataEdit.number.number);
        setData("category", dataEdit.number.categories.category_name);
        setData("discovery", discovery)
    }, []);

    return (
        <FormOverlay handleSubmitForm={submitUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="">
                    <InputLabel value={"Nama Pelanggan"} />
                    <select
                        className="select-create"
                        defaultValue={dataEdit.customers.cust_name}
                        onChange={(e) => {
                            setData("customer", e.target.value);
                            clearErrors("customer");
                        }}
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
                <div className="">
                    <InputLabel value={"Nomor Deposit"} />
                    <select
                        defaultValue={dataEdit.number.number}
                        onChange={(e) => {
                            setData("number", e.target.value);
                            clearErrors("number");
                        }}
                        className="select-create capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Pilih Nomor Deposit</option>
                        {datasFormulir.numCat.map((numberData, i) => (
                            <option value={numberData.number.number} key={i}>
                                {numberData.number.number}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.number} />
                </div>
                <div className="">
                    <select
                        defaultValue={dataEdit.number.categories.category_name}
                        onChange={(e) => {
                            setData("category", e.target.value);
                            clearErrors("category");
                        }}
                        className="select-uncreate captalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Pilih Kategori Produk</option>
                        <option value="pulsa">Pulsa</option>
                        <option value="dana">Dana</option>
                        <option value="token">token</option>
                        <option value="paket data">paket data</option>
                    </select>
                    <InputError message={errors.category} />
                </div>
            </div>

            <div className="flex w-full justify-center mt-5">
                <Button
                    type="submit"
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

const Delete = ({ dataEdit, toggleOverlay }) => {
    const { submitDestroy, setData, processing } =
        useContext(FormBalanceContext);

    useEffect(() => setData("id", dataEdit.id), []);

    return (
        <FormOverlay handleSubmitForm={submitDestroy}>
            <div className="flex flex-col w-full space-y-2.5">
                <BennerText
                    label="nama pelanggan"
                    dataContent={dataEdit.customers.cust_name}
                />
                <BennerText
                    label="nomor"
                    dataContent={dataEdit.number.number}
                />
                <BennerText
                    label="kategori nomor"
                    dataContent={dataEdit.number.categories.category_name}
                />
            </div>
            <div className="flex w-full justify-center mt-5">
                <Button
                    type="submit"
                    className={`flex gap-5 items-center text-xl bg-red-700 text-indigo-100 font-semibold`}
                    disabled={processing}
                >
                    Hapus Nomor
                    <LoadingSession processing={processing} />
                </Button>
            </div>
        </FormOverlay>
    );
};

FormBalance.Create = Create;
FormBalance.Update = Edit;
FormBalance.Destroy = Delete;
export default FormBalance;
