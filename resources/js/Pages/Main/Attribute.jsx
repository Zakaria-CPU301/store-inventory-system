import Button from "@/Components/Elements/Button";
import CardAmountInfo from "@/Components/Elements/CardAmountInfo";
import ModalHeader from "@/Components/Elements/ModalHeader";
import Card from "@/Components/Partials/Card";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";
import React from "react";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import AccessibillityFirst from "@/Components/Elements/AccessibillityFirst";
import AccesibillitySecond from "@/Components/Elements/AccesibillitySecond";
import { usePage } from "@inertiajs/react";
import FormCategory from "@/Components/Form/FormCategory";
import FormUnit from "@/Components/Form/FormUnit";

const Attribute = ({ datas }) => {
    const dataFilters = ["kategori", "satuan"];

    const { attribute } = usePage().props;
    const columns =
        attribute === "satuan"
            ? [
                  {
                      key: "unit_name",
                      label: "nama satuan",
                      opsionalClassName: "capitalize text-center",
                  },
              ]
            : [
                  {
                      key: "category_name",
                      label: "nama category",
                      opsionalClassName: "capitalize text-center",
                  },
              ];

    return (
        <>
            <App>
                {({ setModal, setModalContent }) => (
                    <>
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
                        </HeaderInfo>

                        <HeaderAccessibillity>
                            <AccessibillityFirst dataFilters={dataFilters} />
                            <AccesibillitySecond>
                                <Button className="bg-main-table text-indigo-100 font-bold">
                                    Filter{" "}
                                    <i className="bi bi-funnel-fill text-lg text-purple-100"></i>
                                </Button>
                                <Button
                                    className="bg-light-sky text-blue-900 font-bold"
                                    clickFunc={() => {
                                        setModal(true);
                                        setModalContent(
                                            <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                                                <ModalHeader
                                                    title={
                                                        attribute === "satuan"
                                                            ? "tambah satuan baru"
                                                            : "tambah kategori baru"
                                                    }
                                                    closeModal={() =>
                                                        setModal(false)
                                                    }
                                                />

                                                {attribute === "satuan" ? (
                                                    <FormUnit>
                                                        <FormUnit.Create />
                                                    </FormUnit>
                                                ) : (
                                                    <FormCategory>
                                                        <FormCategory.Create />
                                                    </FormCategory>
                                                )}
                                            </Card>,
                                        );
                                    }}
                                >
                                    Tambah{" "}
                                    <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                                </Button>
                            </AccesibillitySecond>
                        </HeaderAccessibillity>
                        <Table datas={datas} columns={columns} setModal={setModal} setModalContent={setModalContent} />
                    </>
                )}
            </App>
        </>
    );
};

export default Attribute;
