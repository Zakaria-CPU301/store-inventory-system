const Table = ({ firstAction, columns, datas }) => {
    return (
        <div className="w-full rounded-2xl overflow-hidden">
            <table className="border-collapse w-full rounded-2xl bg-[rgb(18,28,53)] px-3">
                <thead className="bg-[rgb(13,23,46)]  text-indigo-50/70">
                    <tr>
                        <th className="capitalize p-3">no</th>
                        {columns.map((name) => (
                            <th className="capitalize p-3">{name.key}</th>
                        ))}

                        <th className="capitalize p-3">aksi</th>
                    </tr>
                </thead>

                <tbody className="text-white bg-[rgb(18,28,53)]">
                    {datas.map((data, index) => (
                        <tr key={index}>
                            <td className="text-center p-3">{firstAction ?? index + 1}</td>
                            {columns.map(col => (
                                <td className={`${col.className ?? 'text-center p-3'}`}>{data[col.key]}</td>
                            ))}
                            <td className="text-center p-3"><i class="bi bi-three-dots"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
