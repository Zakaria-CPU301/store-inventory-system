import Button from "../Elements/Button";

const Table = ({ firstAction = null, columns, datas }) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    return (
        <div className="w-full rounded-b-2xl">
            <table className="border-collapse w-full bg-[rgb(18,28,53)] rounded-2xl">
                <thead className="bg-[rgb(13,23,46)] text-white sticky top-32">
                    <tr>
                        <th className="capitalize p-3">no</th>
                        {columns.map((name, index) => (
                            <th className="capitalize p-3" key={index}>
                                {name.label}
                            </th>
                        ))}
                        <th className="capitalizebg bg-[rgb(5,14,31)]"><div className="rounded-tr-2xl p-3 bg-[rgb(13,23,46)]">aksi</div></th>
                    </tr>
                </thead>

                <tbody className="text-white">
                    {datas.map((data, index) => (
                        <tr key={index}>
                            <td className="text-center p-3">
                                {firstAction ?? index + 1}
                            </td>
                            {columns.map((col, i) => (
                                <td
                                    className={`${col.className ?? "text-center p-3"}`}
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
