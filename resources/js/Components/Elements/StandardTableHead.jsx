import React from "react";

const StandardTableHead = ({ columns }) => {
    return (
        <thead className="z-20 bg-main-layout text-white sticky top-16">
            <tr>
                <th className="capitalize">
                    <div className="rounded-tl-2xl p-3 bg-table-head">no</div>
                </th>
                {columns.map((name, index) => (
                    <th className="capitalize p-3 bg-table-head" key={index}>
                        {name.label}
                    </th>
                ))}
                <th className="capitalize">
                    <div className="rounded-tr-2xl p-3 bg-table-head">Aksi</div>
                </th>
            </tr>
        </thead>
    );
};

export default StandardTableHead;
