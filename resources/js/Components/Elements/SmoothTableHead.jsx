import React from "react";

const SmoothTableHead = ({columns}) => {
    return (
        <thead className="bg-table-head text-white sticky top-34 z-50">
            <tr>
                <th className="capitalize p-3">no</th>
                {columns.map((name, index) => (
                    <th className="capitalize p-3" key={index}>
                        {name.label}
                    </th>
                ))}
                <th className="capitalizebg bg-main-layout">
                    <div className="rounded-tr-2xl p-3 bg-[rgb(13,23,46)]">
                        aksi
                    </div>
                </th>
            </tr>
        </thead>
    );
};

export default SmoothTableHead;
