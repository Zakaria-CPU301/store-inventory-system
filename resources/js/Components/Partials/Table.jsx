import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";

const Table = ({ firstAction = null, columns, datas, iconEmpty, reason, className }) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    const currentRoute = route().current();

    return (
        <div className="w-full">
            <table className="border-collapse w-full bg-main-table rounded-b-2xl">
                {currentRoute === "category.index" ||
                currentRoute === "customer.index" ? (
                    <StandardTableHead columns={columns} />
                ) : (
                    <SmoothTableHead columns={columns} />
                )}

                <tbody className="text-white">
                    {datas.length ? (
                        datas.map((data, index) => (
                            <tr key={index}>
                                <td className="text-center p-3">
                                    {firstAction ?? index + 1}
                                </td>
                                {columns.map((col, i) => (
                                    <td
                                        className={`${col.opsionalClassName ?? "text-center"} p-3`}
                                        key={i}
                                    >
                                        {result(data, col.key)}
                                    </td>
                                ))}
                                <td className="text-center p-3">
                                    <i className="bi bi-three-dots"></i>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={100}>
                                <div className="flex flex-col justify-center items-center h-52 gap-4">
                                    <i className={`${iconEmpty ? iconEmpty : 'bi bi-database-fill-x'} text-5xl`}></i>
                                    <span className="text-3xl font-extrabold">{reason ?? 'Tidak ada data ditemukan'}</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
