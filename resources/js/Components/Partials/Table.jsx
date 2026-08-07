import Button from "../Elements/Button";
import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";

const Table = ({ firstAction = null, columns, datas, className }) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    const currentRoute = route().current();

    return (
        <div className="w-full rounded-b-2xl">
            <table className="border-collapse w-full bg-main-table rounded-2xl">
                {currentRoute == "category.index" ? (
                    <StandardTableHead columns={columns} />
                ) : (
                    <SmoothTableHead columns={columns} />
                )}

                <tbody className="text-white">
                    {datas.map((data, index) => (
                        <tr key={index}>
                            <td className="text-center p-3">
                                {firstAction ?? index + 1}
                            </td>
                            {columns.map((col, i) => (
                                <td
                                    className={`${col.opsionalClassName ?? "text-center p-3"}`}
                                    key={i}
                                >
                                    {result(data, col.key)}
                                </td>
                            ))}
                            <td className="text-center p-3">
                                <i className="bi bi-three-dots"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
