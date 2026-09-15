import { useForm } from "@inertiajs/react";
import React, { createContext, useContext, useEffect } from "react";
import InputLabel from "../Elements/InputLabel";
import Input from "../Elements/Input";
import FormOverlay from "../Partials/FormOverlay";
import Button from "../Elements/Button";
import LoadingSession from "../Elements/LoadingSession";
import InputError from "../Elements/InputError";
import { DiscoveryContext } from "@/Context/Discovery";
import BennerText from "../Elements/BennerText";

export const FormCustomerContext = createContext();

const FormCustomer = ({ children, setModal }) => {
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
        cust_name: "",
        telp: "",
        discovery: [],
    });

    const handleCreate = (e) => {
        e.preventDefault();

        post(route(`customer.store`));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route(`customer.update`));
    };

    const handleDestroy = (e) => {
        e.preventDefault();

        post(route(`customer.destroy`), {
            preserveScroll: true,
            onSuccess: () => setModal(false),
        });
    };
    return (
        <FormCustomerContext.Provider
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
        </FormCustomerContext.Provider>
    );
};

const Create = () => {
    const { setData, handleCreate, processing, errors, clearErrors } =
        useContext(FormCustomerContext);

    return (
        <FormOverlay submitForm={handleCreate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Pelanggan"} />
                <Input
                    placeholder="wajib"
                    onChange={(e) => {
                        setData("cust_name", e.target.value);
                        clearErrors("cust_name");
                    }}
                />
                <InputError message={errors.cust_name} />
            </div>
            <div className="flex flex-col">
                <InputLabel value={"Nomor Telepon"} />
                <Input
                    placeholder="opsional"
                    onChange={(e) => {
                        setData("telp", e.target.value);
                        clearErrors("telp");
                    }}
                />
                <InputError message={errors.telp} />
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

const Update = ({ dataColumn }) => {
    const { setData, handleUpdate, processing, errors, clearErrors } =
        useContext(FormCustomerContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("cust_name", dataColumn.cust_name);
        setData("telp", dataColumn.telp);
        setData("discovery", discovery);
    }, []);
    return (
        <FormOverlay submitForm={handleUpdate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Pelanggan"} />
                <Input
                    placeholder="wajib"
                    defaultValue={dataColumn.cust_name}
                    onChange={(e) => {
                        setData("cust_name", e.target.value);
                        clearErrors("cust_name");
                    }}
                />
                <InputError message={errors.name} />
            </div>
            <div className="flex flex-col">
                <InputLabel value={"Nomor Telepon"} />
                <Input
                    placeholder="opsional"
                    defaultValue={dataColumn.telp}
                    onChange={(e) => {
                        setData("telp", e.target.value);
                        clearErrors("telp");
                    }}
                />
                <InputError message={errors.telp} />
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

const Destroy = ({ dataColumn }) => {
    const { handleDestroy, setData, processing } =
        useContext(FormCustomerContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("discovery", discovery);
    }, []);

    return (
        <FormOverlay submitForm={handleDestroy}>
            <div className="flex flex-col w-full space-y-2.5">
                <BennerText
                    label="nama pelanggan"
                    dataContent={dataColumn.cust_name}
                />
                <BennerText label="nomor telepon" dataContent={dataColumn.telp} />
            </div>
            <div className="flex w-full justify-center mt-5">
                <Button
                    type="handle"
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

FormCustomer.Create = Create;
FormCustomer.Update = Update;
FormCustomer.Destroy = Destroy;
export default FormCustomer;
