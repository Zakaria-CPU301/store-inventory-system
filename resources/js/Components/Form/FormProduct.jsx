import { useForm } from "@inertiajs/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import Button from "../Elements/Button";
import FormOverlay from "../Partials/FormOverlay";
import InputLabel from "../Elements/InputLabel";
import InputError from "../Elements/InputError";
import LoadingSession from "../Elements/LoadingSession";
import Input from "../Elements/Input";
import TomSelect from "tom-select";

export const FormProductContext = createContext();

const FormProduct = ({ children, setModal }) => {
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
        title: "",
        image: null,
        qty: 0,
        desc: "",
        price: 0.0,
    });

    const handleCreate = (e) => {
        e.preventDefault();

        post(route("product.store"));
    };
    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("product.update"), {
            preserveScroll: true,
        });
    };
    const handleDestroy = (e) => {
        e.preventDefault();

        post(route("product.destroy"), {
            preserveScroll: true,
            onSuccess: () => setModal(false)
        });
    };

    useEffect(() => {
        const selectCreate = document.querySelectorAll(".select-create");
        // const selectUncreate = document.querySelectorAll(".select-uncreate");

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

        // if (selectUncreate.length) {
        //     selectUncreate.forEach((e) => {
        //         new TomSelect(e, {
        //             create: false,
        //             sortField: {
        //                 field: "text",
        //                 direction: "asc",
        //             },
        //         });
        //     });
        // }
    }, []);

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

const Create = ({ dataColumn }) => {
    const { data, setData, handleCreate, processing, errors, clearErrors } =
        useContext(FormProductContext);

    const [preview, setPreview] = useState(null);

    const imagePreview = (path) => {
        const file = path.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };
    console.log(dataColumn);
    return (
        <FormOverlay submitForm={handleCreate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <div className="">
                    <InputLabel value={"Nama Produk"} />
                    <Input
                        placeholder="Ketik Nama Produk"
                        onChange={(e) => {
                            setData("title", e.target.value);
                            clearErrors("title");
                        }}
                    />
                    <InputError message={errors.title} />
                </div>
                <div className="">
                    <InputLabel value={"Kategori Produk"} />
                    <select
                        onChange={(e) => {
                            setData("category", e.target.value);
                            clearErrors("category");
                        }}
                        className="select-create capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        data-placeholder="Pilih atau Tambah"
                    >
                        <option value="">Pilih atau Tambah</option>
                        {dataColumn.map((category, i) => (
                            <option value={category.id} key={i}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category} />
                </div>
                <div className="">
                    <InputLabel value={"Harga Produk"} />
                    <Input
                        type="number"
                        placeholder="Masukkan Nominal Harga"
                        onChange={(e) => {
                            setData("price", e.target.value);
                            clearErrors("price");
                        }}
                    />
                    <InputError message={errors.price} />
                </div>
                <div className="">
                    <InputLabel value={"Kategori Produk"} />
                    <select
                        onChange={(e) => {
                            setData("category", e.target.value);
                            clearErrors("category");
                        }}
                        className="select-create capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        data-placeholder="Pilih atau Tambah"
                    >
                        <option value="">Pilih atau Tambah</option>
                        {dataColumn.map((category, i) => (
                            <option value={category.id} key={i}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category} />
                </div>
                <div className="">
                    <InputLabel value={"Jumlah Masuk Produk (opsional)"} />
                    <Input
                        type="number"
                        placeholder="Masukkan Angka"
                        onChange={(e) => {
                            setData("qty", e.target.value);
                            clearErrors("qty");
                        }}
                    />
                    <InputError message={errors.qty} />
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="">
                        <InputLabel value={"Foto Produk"} />
                        <Input
                            type="file"
                            id=""
                            accept="image/*"
                            onChange={(e) => {
                                setData("image", e.target.files[0]);
                                clearErrors("image");
                                imagePreview(e);
                            }}
                            className="cursor-pointer"
                        />
                        <InputError message={errors.image} />
                    </div>

                    {preview && (
                        <div className="rounded-lg">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>
                <div className="">
                    <InputLabel value={"Deskripsi Produk (opsional)"} />
                    <textarea
                        onChange={(e) => {
                            setData("desc", e.target.value);
                            clearErrors("desc");
                        }}
                        placeholder="Masukkan deskripsi produk"
                    ></textarea>
                    <InputError message={errors.desc} />
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
