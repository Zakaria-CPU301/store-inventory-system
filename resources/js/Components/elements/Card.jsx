import PrimaryButton from "../PrimaryButton";

const Card = () => {
    const productName = "Magum Max Filter Kretek lkjlkj asldkjasd";
    return (
        <div className="relative bg-[rgb(17,27,52)] flex flex-col justify-between p-2 rounded-2xl">
            <div className="relative h-1/2 rounded-2xl ring-1 ring-purple-800/70">
                <span className="absolute capitalize px-3 py-1 backdrop-blur-xs bg-black/70 text-slate-200 rounded-xl translate-2">
                    rokok
                </span>
                <img
                    src="/storage/defaults/leptop-chartup.webp"
                    alt="logo_react"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="flex flex-col text-indigo-100">
                <h1
                    className="text-xl font-bold"
                    title={`${productName}`}
                >{productName.slice(0, 27)}...</h1>
                <span>stok: 80</span>
                <span>Rp. 23.000</span>
            </div>
            <div className="flex justify-center my-2.5 space-x-2 px-[5%]">
                <div className="bg-blue-300/80 py-1.5 px-4 space-x-2 capitalize rounded-xl flex-1 text-center">
                    <span className="font-semibold">lihat detail</span>
                </div>
                <div className="bg-blue-300/80 py-1.5 px-4 space-x-2 capitalize rounded-xl text-center">
                    <i className="bi bi-pencil-square text-lg"></i>
                </div>
            </div>
        </div>
    );
};

export default Card;
