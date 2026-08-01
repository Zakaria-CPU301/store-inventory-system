import Card from "@/Components/Elements/Card";
import App from "@/Layouts/App";

const Product = ({ datas }) => {
    return (
        <App>
            <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2.5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </App>
    );
};

export default Product;
