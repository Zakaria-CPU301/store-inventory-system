import Button from "@/Components/Elements/Button";
import Card from "@/Components/Partials/Card";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import Table from "@/Components/Partials/Table";
import App from "@/Layouts/App";

const Balance = ({ balanceDatas }) => {
    const columns = [
        { key: `customers.fullname`, label: "nama pelanggan" },
        { key: `number`, label: "nomor saldo" },
        { key: `categories.category_name`, label: "kategori saldo" },
    ];
    return (
        <App>
            <HeaderInfo>
                <HeaderDesc
                    title="daftar nomor langganan deposit"
                    desc="LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde nisi velit voluptates."
                />

                <Card className="bg-[rgb(18,28,53)]">
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <span className="text-white/75 text-xl">
                            Total Langganan
                        </span>
                        <span className="text-xl text-white">
                            <b className="text-3xl">1000</b> Nomor
                        </span>
                    </div>
                </Card>
                <Card className="bg-[rgb(18,28,53)]">
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <span className="text-white/75 text-xl">
                            Total Langganan
                        </span>
                        <span className="text-xl text-white">
                            <b className="text-3xl">{balanceDatas.length} </b>Nomor
                        </span>
                    </div>
                </Card>
            </HeaderInfo>
            <HeaderAccessibillity>
                <div className="flex-1 px-5 flex items-center rounded-t-2xl bg-[rgb(13,23,46)]">
                    <div className="flex overflow-x-scroll space-x-3 whitespace-nowrap scrollbar-none">
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                    </div>
                </div>
                <div className="bg-[rgb(13,23,46)]">
                    <div className="h-full flex items-center justify-end space-x-3 pl-3 whitespace-nowrap rounded-bl-2xl bg-[rgb(5,14,31)]">
                        <Button>OY BUTTON</Button>
                        <Button>OY BUTTON</Button>
                    </div>
                </div>
            </HeaderAccessibillity>
            <Table columns={columns} datas={balanceDatas} />
        </App>
    );
};

export default Balance;
