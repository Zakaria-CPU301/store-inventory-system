import { useState } from "react";
import Dropdown from "../../Context/Dropdown";
import Button from "../Elements/Button";
import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";
import OverlayModal from "./OverlayModal";
import FormBalance from "../Form/FormBalance";
import ModalHeader from "../Elements/ModalHeader";
import Card from "./Card";
import { usePage } from "@inertiajs/react";

const Table = ({
    firstAction = null,
    columns,
    datas,
    iconEmpty,
    reason,
    customerDatas = null,
    className,
}) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    const { url } = usePage();

    const [showOverlay, setShowOverlay] = useState(false);
    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const [method, setMethod] = useState();

    const [repoData, setRepoData] = useState([]);

    return (
        <>
            <div className="w-full">
                <table className="border-collapse w-full bg-main-table rounded-b-2xl">
                    {route().current("customer.index") ||
                    route().current("category.index") ? (
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
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <i className="bi bi-three-dots cursor-pointer"></i>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content
                                                width="w-30"
                                                contentClasses="py-2 bg-light-sky"
                                                z={"z-52"}
                                            >
                                                <div className="flex flex-col items-center capitalize justify-start space-y-3  text-black">
                                                    <Button
                                                        className={""}
                                                        clickFunc={() => {
                                                            toggleOverlay();
                                                            setMethod("edit");
                                                            setRepoData(data)
                                                        }}
                                                    >
                                                        <i
                                                            className={`bi bi-pencil text-xl`}
                                                        ></i>
                                                        edit
                                                    </Button>
                                                    <Button
                                                        className={""}
                                                        clickFunc={() => {
                                                            toggleOverlay();
                                                            setMethod("hapus");
                                                        }}
                                                    >
                                                        <i
                                                            className={`bi bi-trash text-xl`}
                                                        ></i>
                                                        hapus
                                                    </Button>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={100}>
                                    <div className="flex flex-col justify-center items-center h-52 gap-4">
                                        <i
                                            className={`${iconEmpty ? iconEmpty : "bi bi-database-fill-x"} text-5xl`}
                                        ></i>
                                        <span className="text-3xl font-extrabold">
                                            {reason ??
                                                "Tidak ada data ditemukan"}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showOverlay && (
                <OverlayModal clickFunc={toggleOverlay}>
                    <Card className="bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                        {url === "/balance" && (
                            <>
                                <ModalHeader
                                    title={"edit nomor"}
                                    clickFunc={toggleOverlay}
                                />

                                <FormBalance>
                                    {method === "edit" ? (
                                        <FormBalance.Update
                                            customerDatas={customerDatas}
                                            dataEdit={repoData}
                                        />
                                    ) : (
                                        <FormBalance.Delete />
                                    )}
                                </FormBalance>
                            </>
                        )}
                    </Card>
                </OverlayModal>
            )}
        </>
    );
};

export default Table;
