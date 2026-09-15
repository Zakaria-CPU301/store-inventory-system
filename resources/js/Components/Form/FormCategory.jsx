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

export const FormCategoryContext = createContext();

const FormCategory = ({ children, setModal }) => {
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
        category_name: "",
        discovery: [],
    });
    const handleCreate = (e) => {
        e.preventDefault();

        post(route(`attribute.category.store`));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("attribute.category.update"), {
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
        <FormCategoryContext.Provider
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
        </FormCategoryContext.Provider>
    );
};

const Create = () => {
    const { data, setData, handleCreate, processing, errors, clearErrors } =
        useContext(FormCategoryContext);

    return (
        <FormOverlay submitForm={handleCreate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Kategori"} />
                <Input
                    placeholder="Ketik Nama Kategori"
                    onChange={(e) => {
                        setData("category_name", e.target.value);
                        clearErrors("category_name");
                    }}
                />
                <InputError message={errors.category_name} />
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
    const { data, setData, handleUpdate, processing, errors, clearErrors } =
        useContext(FormCategoryContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("category_name", dataColumn.category_name);
        setData("discovery", discovery);
    }, []);

    return (
        <FormOverlay submitForm={handleUpdate}>
            <div className="flex flex-col">
                <InputLabel value={"Nama Kategori"} />
                <Input
                    placeholder="Ketik Nama Kategori"
                    defaultValue={dataColumn.category_name}
                    onChange={(e) => {
                        setData("category_name", e.target.value);
                        clearErrors("category_name");
                    }}
                />
                <InputError message={errors.category_name} />
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
        useContext(FormCategoryContext);

    const { discovery } = useContext(DiscoveryContext);

    useEffect(() => {
        setData("id", dataColumn.id);
        setData("discovery", discovery);
    }, []);

    return (
        <FormOverlay submitForm={handleDestroy}>
            <div className="flex flex-col w-full space-y-2.5">
                <BennerText
                    label="nama kategori"
                    dataContent={dataColumn.category_name}
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

FormCategory.Create = Create;
FormCategory.Update = Update;
FormCategory.Destroy = Destroy;
export default FormCategory;
