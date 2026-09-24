import Button from "@/Components/Elements/Button";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import InputError from "@/Components/Elements/InputError";
import InputLabel from "@/Components/Elements/InputLabel";
import LoadingSession from "@/Components/Elements/LoadingSession";
import ModalHeader from "@/Components/Elements/ModalHeader";
import SessionInformation from "@/Components/Elements/SessionInformation";
import Input from "@/Components/Elements/Input";
import Card from "@/Components/Partials/Card";
import FormOverlay from "@/Components/Partials/FormOverlay";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import OverlayModal from "@/Components/Partials/OverlayModal";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import FormCustomer from "@/Components/Form/FormCustomer";

const Customer = ({ datas }) => {
    const columns = [
        {
            key: "cust_name",
            label: "nama pembeli",
            opsionalClassName: "capitalize",
        },
        {
            key: "telp",
            label: "nomor telepon",
        },
    ];

    return (
        <>
            <App>
                {({ setModal, setModalContent }) => (
                    <>
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
                                    clickFunc={() => {
                                        setModal(true);
                                        setModalContent(
                                            <Card
                                                className={
                                                    "bg-powderblue w-4/5 md:w-2/4 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl"
                                                }
                                            >
                                                <ModalHeader
                                                    title={"Pelanggan Baru"}
                                                    closeModal={() =>
                                                        setModal(false)
                                                    }
                                                />

                                                <FormCustomer>
                                                    <FormCustomer.Create />
                                                </FormCustomer>
                                            </Card>,
                                        );
                                    }}
                                    className="bg-light-sky text-blue-900 font-bold"
                                >
                                    Tambah{" "}
                                    <i className="bi bi-plus-circle-fill text-lg"></i>
                                </Button>
                            </Card>
                        </HeaderInfo>
                        <Table
                            setModalContent={setModalContent}
                            setModal={setModal}
                            columns={columns}
                            datas={datas}
                            iconEmpty={"bi bi-person-fill-x"}
                            reason={"Tidak ada data pelanggan"}
                        />
                    </>
                )}
            </App>
        </>
    );
};

export default Customer;
