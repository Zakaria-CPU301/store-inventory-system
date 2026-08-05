const TableHead = ({ names }) => {
    return (
        <thead className="bg-[rgb(13,23,46)]  text-indigo-50/70">
            <tr>
                <th className="capitalize p-3">no</th>
                {names.map((name) => (
                    <th className="capitalize p-3">{name}</th>
                ))}
                <th className="capitalize p-3">aksi</th>
            </tr>
        </thead>
    );
};

export default TableHead;
