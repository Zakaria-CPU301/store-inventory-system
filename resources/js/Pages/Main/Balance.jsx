import Button from "@/Components/Elements/Button";
import Card from "@/Components/Partials/Card";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import AccessibillityFirst from "@/Components/Elements/AccessibillityFirst";
import AccesibillitySecond from "@/Components/Elements/AccesibillitySecond";
import OverlayModal from "@/Components/Partials/OverlayModal";
import { useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/Elements/TextInput";
import InputLabel from "@/Components/Elements/InputLabel";
import ModalHeader from "@/Components/Elements/ModalHeader";
import InputError from "@/Components/Elements/InputError";
import LoadingSession from "@/Components/Elements/LoadingSession";
import FormOverlay from "@/Components/Partials/FormOverlay";
import TomSelect from "tom-select";
import { useEffect, useState } from "react";
import "tom-select/dist/css/tom-select.css";
import SessionInformasion from "@/Components/Elements/SessionInformasion";

const Balance = ({ balanceDatas, customerDatas, categoryDatas }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    //todo TomSelect
    useEffect(() => {
        if (!showOverlay) return;

        new TomSelect("#select-customer-name", {
            create: true,
            sortField: {
                field: "text",
                direction: "asc",
            },
        });
    }, [showOverlay]);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const categories = [];
    const customers = [];
    balanceDatas.map((customer) => {
        customers.push(customer.customers.cust_name);
    });
    categoryDatas.map((category) => {
        categories.push(category.number.categories.category_name);
    });

    const columns = [
        {
            key: `customers.cust_name`,
            label: "nama pelanggan",
            opsionalClassName: "text-start capitalize",
        },
        { key: `number.number`, label: "nomor saldo" },
        { key: `number.categories.category_name`, label: "kategori saldo" },
    ];

    const {
        data,
        setData,
        post,
        errors,
        recentlySuccessful,
        processing,
        clearErrors,
    } = useForm({
        customer: "",
        number: "",
        category: "",
    });

    const submit = (e) => {
        e.preventDefault();

        return post(route("balance.store"));
    };
    return (
        <>
            <SessionInformasion recentlySuccessful={recentlySuccessful} />

            {showOverlay && (
                <OverlayModal clickFunc={toggleOverlay}>
                    <Card className="bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                        <ModalHeader
                            title={"nomor saldo baru"}
                            clickFunc={toggleOverlay}
                        />
                        <form onSubmit={submit} className="">
                            <FormOverlay>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                                    <div className="">
                                        <InputLabel value={"Nama Pelanggan"} />
                                        <select
                                            id="select-customer-name"
                                            defaultValue={data.customer}
                                            onChange={(e) => {
                                                setData(
                                                    "customer",
                                                    e.target.value,
                                                );
                                                clearErrors("customer");
                                            }}
                                        >
                                            <option value="">
                                                Pilih atau Tambah
                                            </option>

                                            {customerDatas.map(
                                                (customerData, i) => (
                                                    <option
                                                        value={customerData.id}
                                                        key={i}
                                                    >
                                                        {customerData.cust_name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        <InputError message={errors.customer} />
                                    </div>
                                    <div className="">
                                        <InputLabel value={"Nomor Deposit"} />
                                        <TextInput
                                            type={"text"}
                                            placeholder={
                                                "Masukkan Nomor Deposit"
                                            }
                                            value={data.number}
                                            onChange={(e) => {
                                                setData(
                                                    "number",
                                                    e.target.value,
                                                );
                                                clearErrors("number");
                                            }}
                                        />
                                        <InputError message={errors.number} />
                                    </div>
                                    <div className="">
                                        <select
                                            name="category"
                                            id=""
                                            defaultValue={data.category}
                                            onChange={(e) => {
                                                setData(
                                                    "category",
                                                    e.target.value,
                                                );
                                                clearErrors("category");
                                            }}
                                            className="captalize text-sm md:text-xl p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option hidden>
                                                Pilih Kategori Produk
                                            </option>
                                            <option value="pulsa">Pulsa</option>
                                            <option value="dana">Dana</option>
                                            <option value="token">token</option>
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
                                        <LoadingSession
                                            processing={processing}
                                        />
                                    </Button>
                                </div>
                            </FormOverlay>
                        </form>
                    </Card>
                </OverlayModal>
            )}
            <App>
                <HeaderInfo>
                    <HeaderDesc
                        title="daftar langganan saldo deposit"
                        desc="LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates."
                    />

                    <Card className="bg-[rgb(18,28,53)] p-4">
                        <CardAmountInfo
                            label="total nomor"
                            amount={balanceDatas.length}
                            unit="nomor"
                        />
                    </Card>
                    <Card className="bg-[rgb(18,28,53)] p-4">
                        <CardAmountInfo
                            label="total pelanggan"
                            amount={[...new Set(customers)].length}
                            unit="pelanggan"
                        />
                    </Card>
                </HeaderInfo>

                <HeaderAccessibillity>
                    <AccessibillityFirst
                        dataFilters={[...new Set(categories)]}
                    />
                    <AccesibillitySecond>
                        <Button className="bg-main-table text-indigo-100 font-bold">
                            Filter{" "}
                            <i className="bi bi-funnel-fill text-lg text-purple-100"></i>
                        </Button>
                        <Button
                            className="bg-light-sky text-blue-900 font-bold"
                            clickFunc={toggleOverlay}
                        >
                            Tambah{" "}
                            <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                        </Button>
                    </AccesibillitySecond>
                </HeaderAccessibillity>
                <Table columns={columns} datas={balanceDatas} />
            </App>
        </>
    );
};

export default Balance;
