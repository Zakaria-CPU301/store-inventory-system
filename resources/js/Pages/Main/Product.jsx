import AccesibillitySecond from "@/Components/Elements/AccesibillitySecond";
import AccessibillityFirst from "@/Components/Elements/AccessibillityFirst";
import Button from "@/Components/Elements/Button";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import ModalHeader from "@/Components/Elements/ModalHeader";
import FormProduct from "@/Components/Form/FormProduct";
import Card from "@/Components/Partials/Card";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import App from "@/Layouts/App";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const Product = ({
    setModal,
    setModalContent,
    productDatas,
    categoryDatas,
    unitDatas,
}) => {
    const { flash } = usePage();
    const { data, setData, post } = useForm({
        code: "",
    });
    const productInvoice = (e) => {
        e.preventDefault();
        post(route("transaction.dataIntoInvoice"));
    };
    const categories = [];
    productDatas.map((product) => {
        categories.push(product.category.category_name);
    });

    const dataColumn = {
        categoryDatas: categoryDatas,
        unitDatas: unitDatas,
    };

    const handleFormProduct = () => {
        setModal(true);
        setModalContent(() => (
            <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 p-4 max-h-[calc(80vh)] rounded-2xl">
                <ModalHeader
                    title={"Pengaturan Produk Baru"}
                    closeModal={() => setModal(false)}
                />

                <FormProduct>
                    <FormProduct.Create dataColumn={dataColumn} />
                </FormProduct>
            </Card>
        ));
    };

    useEffect(() => {
        if (flash.barcode) handleFormProduct();
    }, [flash.timestamp]);
    return (
        <>
            <HeaderInfo>
                <HeaderDesc
                    title="Daftar Barang"
                    desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, provident fugiat adipisci accusamus maxime repudiandae magni velit vel a impedit quisquam eius laborum repellendus error ab sint fuga eos et!"
                />

                <Card className="bg-[rgb(18,28,53)] p-4">
                    <CardAmountInfo
                        label="total produk tersedia"
                        amount={productDatas.length}
                        unit="produk"
                    />
                </Card>
            </HeaderInfo>
            <HeaderAccessibillity>
                <AccessibillityFirst dataFilters={[...new Set(categories)]} />
                <AccesibillitySecond>
                    <Button className="bg-[rgb(29,42,77)] text-indigo-100 font-bold">
                        Filter <i className="bi bi-funnel-fill text-lg"></i>
                    </Button>
                    <Button
                        type="button"
                        className="bg-light-sky text-blue-900 font-bold"
                        clickFunc={handleFormProduct}
                    >
                        Tambah{" "}
                        <i className="bi bi-plus-circle-fill text-lg"></i>
                    </Button>
                </AccesibillitySecond>
            </HeaderAccessibillity>

            <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5 mt-3">
                {productDatas.map((data, i) => (
                    <Card key={i} className="bg-[rgb(17,27,52)]">
                        <div className="relative h-1/2 rounded-2xl ring-1 ring-purple-800/70">
                            <span className="absolute capitalize px-3 py-1 backdrop-blur-xs bg-black/70 text-slate-200 rounded-xl translate-2">
                                {data.category.category_name}
                            </span>
                            <img
                                src={`/storage/image-products/${data.product_image}`}
                                alt={data.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col text-indigo-100">
                            <h1
                                className="text-xl font-bold"
                                title={`${data.name}`}
                            >
                                {data.name.slice(0, 27)}
                                {"..."}
                            </h1>
                            <span>stok: {data.qty}</span>
                            <span>
                                Rp. {data.price} / {data.unit}
                            </span>
                        </div>
                        <div className="flex justify-center my-2.5 space-x-2 px-[5%]">
                            <div className="bg-blue-300/80 py-1.5 px-4 space-x-2 capitalize rounded-xl flex-1 text-center">
                                <span className="font-semibold">
                                    lihat detail
                                </span>
                            </div>
                            <button className="bg-blue-300/80 py-1 px-3 space-x-2 capitalize rounded-xl text-center">
                                <i className="bi bi-pencil-square text-lg"></i>
                            </button>
                            <form onSubmit={productInvoice}>
                                <button
                                    type="submit"
                                    onClick={() =>
                                        setData("code", data.barcode)
                                    }
                                    className="py-1 px-3 bg-indigo-500 capitalize rounded-xl text-center cursor-pointer"
                                >
                                    <i className="bi bi-receipt text-3xl text-white font-bold"></i>
                                </button>
                            </form>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

Product.layout = (page) => (
    <App>
        {({ setModal, setModalContent }) => {
            return React.cloneElement(page, { setModal, setModalContent });
        }}
    </App>
);

export default Product;
