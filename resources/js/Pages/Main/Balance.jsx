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

const Balance = ({ balanceDatas }) => {
    const categories = [];
    const customers = [];
    balanceDatas.map((balanceData) => {
        categories.push(balanceData.categories.category_name);
        customers.push(balanceData.customers.fullname);
    });

    const columns = [
        {
            key: `customers.fullname`,
            label: "nama pelanggan",
            opsionalClassName: "text-start",
        },
        { key: `number`, label: "nomor saldo" },
        { key: `categories.category_name`, label: "kategori saldo" },
    ];
    return (
        <App>
            <HeaderInfo>
                <HeaderDesc
                    title="daftar langganan saldo deposit"
                    desc="LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates."
                />

                <Card className="bg-[rgb(18,28,53)]">
                    <CardAmountInfo
                        label="total nomor"
                        amount={balanceDatas.length}
                        unit="nomor"
                    />
                </Card>
                <Card className="bg-[rgb(18,28,53)]">
                    <CardAmountInfo
                        label="total pelanggan"
                        amount={[...new Set(customers)].length}
                        unit="pelanggan"
                    />
                </Card>
            </HeaderInfo>

            <HeaderAccessibillity>
                <AccessibillityFirst dataFilter={[...new Set(categories)]} />
                <AccesibillitySecond>
                    <Button className="bg-main-table text-indigo-100 font-bold">
                        Filter{" "}
                        <i className="bi bi-funnel-fill text-lg text-purple-100"></i>
                    </Button>
                    <Button className="bg-light-sky text-blue-900 font-bold">
                        Tambah{" "}
                        <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                    </Button>
                </AccesibillitySecond>
            </HeaderAccessibillity>
            <Table columns={columns} datas={balanceDatas} />
        </App>
    );
};

export default Balance;
