import Table from "@/Components/Elements/Table";
import App from "@/Layouts/App";

const Balance = ({ balance }) => {
    const columns = [
        { key: 'name', label: "nama pelanggan", className: "text-start" },
        { key: 'number', label: "nomor produk" },
        { key: 'category', label: "kategori" },
    ];
    return (
        <App>
            <Table columns={columns} datas={balance} />
        </App>
    );
};

export default Balance;
