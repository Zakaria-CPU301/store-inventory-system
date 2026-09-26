import { useForm, usePage } from "@inertiajs/react";
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
    const { barcode } = usePage().flash;

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
        barcode: barcode ?? "",
        qrcode: usePage().props.qrcode,
        title: "",
        units: [{ unit: "", atom: 0, price: 0.0 }],
        image: null,
        category: "",
        desc: "",
    });

    const handleInitProduct = (e) => {
        e.preventDefault();
        post(route("product.init"));
    };
    const handlePurchaseProduct = (e) => {
        e.preventDefault();
        post(route("product.purchase"));
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
            onSuccess: () => setModal(false),
        });
    };

    useEffect(() => {
        // const selectCreate = document.querySelectorAll(".select-create");
        const selectUncreate = document.querySelectorAll(
            ".select-uncreate-product",
        );

        // if (selectCreate.length) {
        //     selectCreate.forEach((e) => {
        //         new TomSelect(e, {
        //             create: true,
        //             sortField: {
        //                 field: "text",
        //                 direction: "asc",
        //             },
        //         });
        //     });
        // }

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
        <FormProductContext.Provider
            value={{
                handleInitProduct,
                handlePurchaseProduct,
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
    const { flash } = usePage();
    const {
        data,
        setData,
        handleInitProduct,
        handlePurchaseProduct,
        processing,
        errors,
        clearErrors,
        units,
        setUnits,
    } = useContext(FormProductContext);

    const [preview, setPreview] = useState(null);

    const imagePreview = (path) => {
        const file = path.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const handleNewUnit = () => {
        setData("units", [
            ...data.units,
            {
                unit: "",
                atom: 0,
                price: 0.0,
            },
        ]);
    };
    const handleReduceUnit = (index) => {
        const dataUnits = [...data.units];
        if (data.units.length !== 1) {
            dataUnits.splice(index, 1);
        }
        setData("units", dataUnits);
    };
    const handleUnitChange = (index, field, value) => {
        const units = [...data.units];

        units[index] = {
            ...units[index],
            [field]: value,
        };

        setData("units", units);
    };
    console.log(flash)
    return (
        <FormOverlay
            submitForm={
                flash.purchase_transaction
                    ? handlePurchaseProduct
                    : handleInitProduct
            }
        >
            <div className="flex flex-col">
                <div className="border-x p-4 flex flex-col border-indigo-400">
                    <div className="">
                        <InputLabel value={"Nama Produk"} />
                        <Input
                            placeholder="Required"
                            onChange={(e) => {
                                setData("title", e.target.value);
                                clearErrors("title");
                            }}
                        />
                        <InputError message={errors.title} />
                    </div>
                </div>
                <table className="border-x border-b border-indigo-400">
                    <thead className="w-full">
                        <tr>
                            <td className="px-4" colSpan={4}>
                                <InputLabel
                                    value={"pengaturan satuan produk"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className=" border border-indigo-400">
                                <InputLabel
                                    className="w-full"
                                    value={"nama satuan"}
                                />
                            </th>
                            <th className=" border border-indigo-400">
                                <InputLabel
                                    className="w-full"
                                    value={"Jumlah (pcs)"}
                                />
                            </th>
                            {flash.purchase_transaction && (
                                <th className="border border-indigo-400">
                                    <InputLabel
                                        className="w-full"
                                        value={"Harga (satuan)"}
                                    />
                                </th>
                            )}
                            <th className="border border-indigo-400">
                                <button
                                    type="button"
                                    onClick={handleNewUnit}
                                    title="Tambah satuan produk"
                                >
                                    <i className="bi bi-plus-circle-fill text-blue-500 hover:text-blue-700 duration-200 cursor-pointer text-3xl"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="unit-settings">
                        {data.units.map((unit, index) => (
                            <tr key={index}>
                                <td className="px-1.5 py-3">
                                    <select
                                        onChange={(e) =>
                                            handleUnitChange(
                                                index,
                                                "unit",
                                                e.target.value,
                                            )
                                        }
                                        className="text-sm md:text-xl p-3 w-full rounded-md shadow-md border border-gray-300 focus:border-indigo-600 hover:border-indigo-300 duration-150 outline-none"
                                        data-placeholder="Pilih satuan"
                                    >
                                        <option value="">Pilih satuan</option>
                                        {dataColumn.unitDatas.map((unit, i) => (
                                            <option value={unit.id} key={i}>
                                                {unit.unit_name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors[`units.${index}.unit`]}
                                    />
                                </td>
                                <td className="px-1.5 py-3 border-indigo-400">
                                    <Input
                                        type="number"
                                        defaultValue={1}
                                        min={0}
                                        onChange={(e) =>
                                            handleUnitChange(
                                                index,
                                                "atom",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors[`units.${index}.atom`]}
                                    />
                                </td>
                                {flash.purchase_transaction && (
                                    <td className="px-1.5 py-3 border-indigo-400">
                                        <Input
                                            type="number"
                                            defaultValue={0}
                                            min={0}
                                            onChange={(e) =>
                                                handleUnitChange(
                                                    index,
                                                    "price",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                errors[`units.${index}.price`]
                                            }
                                        />
                                    </td>
                                )}
                                <td className="">
                                    <div className="flex flex-1 justify-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleReduceUnit(index)
                                            }
                                            className="duration-200 bg-red-500 hover:bg-red-700 text-white p-1 cursor-pointer rounded-md"
                                        >
                                            <i className="bi bi-trash text-lg"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
                    <div className="">
                        <InputLabel value={"Kategori Produk"} />
                        <select
                            onChange={(e) => {
                                setData("category", e.target.value);
                                clearErrors("category");
                            }}
                            className="select-create capitalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            data-placeholder="Opsional"
                        >
                            <option value="">Opsional</option>
                            {dataColumn.categoryDatas.map((category, i) => (
                                <option value={category.id} key={i}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category} />
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
                        <InputLabel value={"Deskripsi Produk"} />
                        <textarea
                            onChange={(e) => {
                                setData("desc", e.target.value);
                                clearErrors("desc");
                            }}
                            placeholder="opsional"
                            className="input text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                        ></textarea>
                        <InputError message={errors.desc} />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center mt-4">
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
