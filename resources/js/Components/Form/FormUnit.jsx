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

export const FormUnitContext = createContext();

const FormUnit = ({ children, setModal }) => {
    const {
        data,
        setData,
        post,
        put,
        errors,
        recentlySuccessful,
        processing,
        clearErrors,
        reset,
    } = useForm({
        id: null,
        unit_name: "",
        discovery: [],
    });
    const handleCreate = (e) => {
        e.preventDefault();

        post(route(`attribute.unit.store`), {
            onSuccess: () => reset("unit_name"),
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("attribute.unit.update"), {
            preserveScroll: true,
        });
    };

    const handleDestroy = (e) => {
        e.preventDefault();

        post(route("attribute.category.destroy"), {
            preserveScroll: true,
            onSuccess: () => setModal(false),
        });
    };

    return (
        <FormUnitContext.Provider
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
        </FormUnitContext.Provider>
    );
};

const Create = () => {
    const { data, setData, handleCreate, processing, errors, clearErrors } =
        useContext(FormUnitContext);

    return (
        <FormOverlay submitForm={handleCreate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Satuan"} />
                <Input
                    placeholder="Ketik Nama Satuan"
                    value={data.unit_name}
                    onChange={(e) => {
                        setData("unit_name", e.target.value);
                        clearErrors("unit_name");
                    }}
                />
                <InputError message={errors.unit_name} />
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
        useContext(FormUnitContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("discovery", discovery);
        setData("unit_name", dataColumn.unit_name);
    }, []);

    return (
        <FormOverlay submitForm={handleUpdate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Satuan"} />
                <Input
                    placeholder="Ketik Nama Satuan"
                    defaultValue={dataColumn.unit_name}
                    onChange={(e) => {
                        setData("unit_name", e.target.value);
                        clearErrors("unit_name");
                    }}
                />
                <InputError message={errors.unit_name} />
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
    const { handleDestroy, setData, processing } = useContext(FormUnitContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("discovery", discovery);
    }, []);

    return (
        <FormOverlay submitForm={handleDestroy}>
            <div className="flex flex-col w-full space-y-2.5">
                <BennerText
                    label="nama satuan"
                    dataContent={dataColumn.unit_name}
                />
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

FormUnit.Create = Create;
FormUnit.Update = Update;
FormUnit.Destroy = Destroy;
export default FormUnit;
