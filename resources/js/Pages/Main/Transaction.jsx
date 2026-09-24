import AccesibillitySecond from "@/Components/Elements/AccesibillitySecond";
import Button from "@/Components/Elements/Button";
import ModalHeader from "@/Components/Elements/ModalHeader";
import SessionInformation from "@/Components/Elements/SessionInformation";
import FormProduct from "@/Components/Form/FormProduct";
import Card from "@/Components/Partials/Card";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import App from "@/Layouts/App";
import { useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import AccessibillityFirst from "@/Components/Elements/AccessibillityFirst";
import React from "react";
import { DiscoveryContext } from "@/Context/Discovery";
import { QRCodeSVG } from "qrcode.react";
import SmoothTableHead from "@/Components/Elements/SmoothTableHead";

const Transaction = ({
    datas,
    categoryDatas,
    unitDatas,
    setModal,
    setModalContent,
}) => {
    const { flash } = usePage();

    const { invoice } = useContext(DiscoveryContext);

    const [show, setShow] = useState(false);
    const [focus, setFocus] = useState();
    const message = focus ? "siap" : "tidak";

    const { post, reset, data, setData, errors } = useForm({
        code: "",
        incoming: true,
    });
    const scanning = (e) => {
        e.preventDefault();
        post(route("transaction.scanning"), {
            onSuccess: () => reset("code"),
            onError: () => {
                reset("code");
                setShow(true);
            },
        });
    };
    const createInvoice = (e) => {
        e.preventDefault();
        post(route("transaction.invoice"), { preserveState: false });
    };

    const qrcode = [];
    datas.map((data) => {
        qrcode.push(data.qrcode);
    });

    const columns = [
        { label: "nama produk" },
        // { label: "harga (satuan)" },
        // { label: "jumlah" },
        // { label: "harga netto" },
    ];

    const dataColumn = {
        categoryDatas: categoryDatas,
        unitDatas: unitDatas,
    };

    useEffect(() => {
        if (!flash.barcode) return;
        setModal(true);
        setModalContent(
            <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 p-4 max-h-[calc(80vh)] rounded-2xl">
                <ModalHeader
                    title={"Produk Baru"}
                    closeModal={() => setModal(false)}
                />

                <FormProduct>
                    <FormProduct.Create dataColumn={dataColumn} />
                </FormProduct>
            </Card>,
        );
    }, [flash.barcode]);
    return (
        <>
            <SessionInformation
                icon={"x"}
                className={"bg-red-500"}
                message={errors.code}
                show={show}
                setShow={setShow}
            />
            <form onSubmit={scanning} className="">
                <Card className={"bg-powderblue flex sticky top-0 w-4/5"}>
                    {message}
                </Card>

                <input
                    id="scanner"
                    autoFocus
                    autoComplete="off"
                    value={data.code}
                    onFocus={() => {
                        setData("code", "");
                        setFocus(true);
                    }}
                    onBlur={() => setFocus(false)}
                    type="text"
                    onChange={(e) => setData("code", e.target.value)}
                    className="bg-white"
                />
                <button type="submit"></button>
            </form>
            <React.Fragment>
                {datas.map((data) =>
                    data.qrcode === invoice ? (
                        <HeaderInfo>
                            <div className="flex-1 space-y-5 text-white self-start">
                                <h1 className="text-3xl font-extrabold capitalize">
                                    cetak transaksi
                                </h1>
                                <div className="">
                                    Nomor Faktur: {data.qrcode}
                                </div>
                            </div>

                            <Card className={"bg-light-sky p-4"}>
                                <QRCodeSVG
                                    value={data.qrcode}
                                    imageSettings={{
                                        src: "/storage/defaults/dalis_store_logo.png",
                                        width: 50,
                                        height: 50,
                                        excavate: true,
                                    }}
                                    title="info faktur transaksi"
                                    level="H"
                                />
                            </Card>
                        </HeaderInfo>
                    ) : null,
                )}

                <HeaderAccessibillity>
                    <AccessibillityFirst dataFilters={qrcode} />
                    <AccesibillitySecond>
                        <Button className="bg-main-table text-indigo-100 font-bold">
                            Filter{" "}
                            <i className="bi bi-funnel-fill text-lg text-purple-100"></i>
                        </Button>
                        <Button
                            type="button"
                            className="bg-light-sky text-blue-900 font-bold"
                            clickFunc={() => {
                                setModal(true);
                                setModalContent(
                                    <Card className="z-10 bg-powderblue w-1/3 min-h-0 px-4  rounded-2xl">
                                        <ModalHeader
                                            title={"jenis mutasi aset"}
                                            closeModal={() => setModal(false)}
                                        />
                                        <form
                                            onSubmit={createInvoice}
                                            className="flex w-full justify-evenly py-6"
                                        >
                                            <Button
                                                type="submit"
                                                clickFunc={() =>
                                                    setData("incoming", true)
                                                }
                                            >
                                                Masuk
                                            </Button>
                                            <Button
                                                type="submit"
                                                clickFunc={() =>
                                                    setData("incoming", false)
                                                }
                                            >
                                                Keluar
                                            </Button>
                                        </form>
                                    </Card>,
                                );
                            }}
                        >
                            Tambah{" "}
                            <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                        </Button>
                    </AccesibillitySecond>
                </HeaderAccessibillity>
                <div className="w-full relative">
                    <table className="border-collapse w-full bg-main-table rounded-b-2xl">
                        <SmoothTableHead columns={columns} />

                        <tbody className="text-white">
                            {datas.map((data, index) =>
                                data.qrcode === invoice ? (
                                    data.transaction_logs.length ? (
                                        data.transaction_logs.map(
                                            (transaction_log, index) => (
                                                <tr key={index}>
                                                    {console.log(
                                                        transaction_log,
                                                    )}
                                                    <td className="text-center p-3">
                                                        <input
                                                            type="checkbox"
                                                            name=""
                                                            id=""
                                                        />
                                                    </td>
                                                    <td>
                                                        {
                                                            transaction_log
                                                                .invoice_log
                                                                .name
                                                        }
                                                    </td>
                                                    <td className="text-center p-3">
                                                        <div className="flex flex-col items-center capitalize justify-start space-y-3  text-black">
                                                            <Button
                                                                className={""}
                                                                clickFunc={() => {
                                                                    setModal(
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <i
                                                                    className={`bi bi-trash text-xl`}
                                                                ></i>
                                                                hapus
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan={100}>
                                                <div className="flex flex-col justify-center items-center h-52 gap-4">
                                                    <i
                                                        className={`bi bi-database-fill-x text-5xl`}
                                                    ></i>
                                                    <span className="text-3xl font-extrabold">
                                                        {
                                                            "Data tidak di temukan"
                                                        }
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ) : null,
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        </>
    );
};

Transaction.layout = (page) => (
    <App>
        {({ setModal, setModalContent }) => {
            return React.cloneElement(page, { setModal, setModalContent });
        }}
    </App>
);

export default Transaction;
