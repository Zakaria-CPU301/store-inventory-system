import Button from "@/Components/Elements/Button";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import InputError from "@/Components/Elements/InputError";
import InputLabel from "@/Components/Elements/InputLabel";
import LoadingSession from "@/Components/Elements/LoadingSession";
import ModalHeader from "@/Components/Elements/ModalHeader";
import TextInput from "@/Components/Elements/TextInput";
import Card from "@/Components/Partials/Card";
import FormOverlay from "@/Components/Partials/FormOverlay";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import OverlayModal from "@/Components/Partials/OverlayModal";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";
import { Form, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import SessionInformasion from "@/Components/Elements/sessionInformasion";

const Category = ({ datas }) => {
    const [showOverlay, SetShowOverlay] = useState(false);

    const toggleOverlay = () => {
        SetShowOverlay(!showOverlay);
    };

    const columns = [
        {
            key: "category_name",
            label: "nama category",
            opsionalClassName: "capitalize text-center",
        },
    ];

    const {
        data,
        setData,
        processing,
        post,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        category: "",
    });

    const submit = (e) => {
        e.preventDefault();
        
        post(route("category.store"));
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
                            title={"tambah kategori baru"}
                        />
                        <Form onSubmit={submit} resetOnSuccess>
                            <FormOverlay>
                                <div className="grid grid-1">
                                    <div className="">
                                        <InputLabel value={"Nama kategori"} />
                                        <TextInput
                                            placeholder="masukkan nama kategori"
                                            type={"text"}
                                            name="category"
                                            value={data.category}
                                            onChange={(e) => {
                                                setData(
                                                    "category",
                                                    e.target.value,
                                                );
                                                clearErrors("category");
                                            }}
                                        />
                                        <InputError message={errors.category} />
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
                        </Form>
                    </Card>
                </OverlayModal>
            )}
            <App>
                <HeaderInfo>
                    <HeaderDesc
                        title={`kelola kategori`}
                        desc={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis rerum architecto saepe consequuntur, quibusdam natus modi, eveniet error quia ea aut, eos veritatis voluptatem praesentium suscipit odit reiciendis eum in.`}
                    />
                    <Card className={"bg-main-table p-4"}>
                        <CardAmountInfo
                            label={"total kategori"}
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

                <Table datas={datas} columns={columns} />
            </App>
        </>
    );
};

export default Category;
