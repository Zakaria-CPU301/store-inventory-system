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
import "tom-select/dist/css/tom-select.css";
import { useContext } from "react";
import { ModalContext } from "@/Context/Modal";
import ModalHeader from "@/Components/Elements/ModalHeader";
import FormBalance from "@/Components/Form/FormBalance";

function Balance({ balanceDatas, customerDatas, numberCategoryDatas }) {
    const { setModalContent, setModal } = useContext(ModalContext);

    const categories = [];
    const customers = [];
    balanceDatas.map((customer) => {
        customers.push(customer.customers.cust_name);
    });
    numberCategoryDatas.map((category) => {
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

    const datasFormulir = {
        cust: customerDatas,
        numCat: numberCategoryDatas,
    };

    return (
        <>
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
                            clickFunc={() => {
                                setModal((prev) => !prev);
                                setModalContent(() => (
                                    <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                                        <ModalHeader
                                            title={"nomor saldo baru"}
                                            clickFunc={() => setModal(false)}
                                        />

                                        <FormBalance>
                                            <FormBalance.Create
                                                datasFormulir={datasFormulir}
                                            />
                                        </FormBalance>
                                    </Card>
                                ));
                            }}
                        >
                            Tambah{" "}
                            <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                        </Button>
                    </AccesibillitySecond>
                </HeaderAccessibillity>
                <Table
                    columns={columns}
                    datas={balanceDatas}
                    datasFormulir={datasFormulir}
                />
            </App>
        </>
    );
}

export default Balance;
