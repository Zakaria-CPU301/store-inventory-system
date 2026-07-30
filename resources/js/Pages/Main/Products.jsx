import App from "@/Layouts/App";
import { Link } from "@inertiajs/react";

const Products = ({ datas }) => {
    return (
        <App>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, id) => (
                        <tr key={id}>
                            <td>{data.name}</td>
                            <td>{data.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href="/balance">Balance</Link>
        </App>
    );
};

export default Products;
