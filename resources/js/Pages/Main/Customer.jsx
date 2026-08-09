import Button from "@/Components/Elements/Button";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import InputError from "@/Components/Elements/InputError";
import InputLabel from "@/Components/Elements/InputLabel";
import LoadingSession from "@/Components/Elements/LoadingSession";
import ModalHeader from "@/Components/Elements/ModalHeader";
import SessionInformasion from "@/Components/Elements/SessionInformasion";
import TextInput from "@/Components/Elements/TextInput";
import Card from "@/Components/Partials/Card";
import FormOverlay from "@/Components/Partials/FormOverlay";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import OverlayModal from "@/Components/Partials/OverlayModal";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const Customer = ({ datas }) => {
    const columns = [{ key: "cust_name", label: "nama pembeli", opsionalClassName: 'capitalize' }];

    const {
        data,
        setData,
        clearErrors,
        errors,
        recentlySuccessful,
        post,
        processing,
    } = useForm({
        customer: "",
    });

    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("customer.store"));
    };

    return (
        <>
            <SessionInformasion recentlySuccessful={recentlySuccessful} />
            {showOverlay && (
                <OverlayModal clickFunc={toggleOverlay}>
                    <Card
                        className={
                            "bg-powderblue w-4/5 md:w-2/4 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl"
                        }
                    >
                        <ModalHeader
                            clickFunc={toggleOverlay}
                            title={"tambah pelanggan baru"}
                        />
                        <form onSubmit={submit}>
                            <FormOverlay>
                                <div className="grid grid-1">
                                    <div className="">
                                        <InputLabel value={"Nama pelanggan"} />
                                        <TextInput
                                            placeholder="masukkan nama pelanggan"
                                            type={"text"}
                                            name="customer"
                                            value={data.customer}
                                            onChange={(e) => {
                                                setData(
                                                    "customer",
                                                    e.target.value,
                                                );
                                                clearErrors("customer");
                                            }}
                                        />
                                        <InputError message={errors.customer} />
                                    </div>
                                </div>

                                <div className="flex justify-center mt-5">
                                    <Button>
                                        Kirim
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
                        title={`kelola pelanggan`}
                        desc={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis rerum architecto saepe consequuntur, quibusdam natus modi, eveniet error quia ea aut, eos veritatis voluptatem praesentium suscipit odit reiciendis eum in.`}
                    />
                    <Card className={"bg-main-table p-4"}>
                        <CardAmountInfo
                            label={"total pelanggan terdaftar"}
                            amount={datas.length}
                        />
                    </Card>

                    <Card>
                        <Button
                            clickFunc={toggleOverlay}
                            className="bg-light-sky text-blue-900 font-bold"
                        >
                            Tambah{" "}
                            <i className="bi bi-plus-circle-fill text-lg"></i>
                        </Button>
                    </Card>
                </HeaderInfo>
                <Table columns={columns} datas={datas} />
            </App>
        </>
    );
};

export default Customer;
