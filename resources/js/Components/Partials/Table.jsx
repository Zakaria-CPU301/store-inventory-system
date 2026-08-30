import { useContext, useState } from "react";
import Button from "../Elements/Button";
import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";
import OverlayModal from "./OverlayModal";
import FormBalance from "../Form/FormBalance";
import ModalHeader from "../Elements/ModalHeader";
import Card from "./Card";
import { usePage } from "@inertiajs/react";
import Dropdown, { DropDownContext } from "@/Context/Dropdown";

const Table = ({
    firstAction = null,
    columns,
    datas,
    iconEmpty,
    reason,
    datasFormulir = null,
    className,
}) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    const { url } = usePage();

    const [showOverlay, setShowOverlay] = useState(false);
    const toggleOverlay = () => setShowOverlay((prev) => !prev);

    const [method, setMethod] = useState();

    const [repoData, setRepoData] = useState([]);

    const { open, identity } = useContext(DropDownContext);

    return (
        <>
            <div className="w-full relative">
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
                                        <Dropdown.Trigger id={data.id}>
                                            <i
                                                className={`bi bi-three-dots cursor-pointer px-2 py-1 rounded-lg duration-100  ${open && identity === data.id ? "ring-2" : ""}`}
                                            ></i>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content
                                            id={data.id}
                                            width="w-30"
                                            contentClasses="py-2 bg-light-sky"
                                            z={"z-10"}
                                        >
                                            <div className="flex flex-col items-center capitalize justify-start space-y-3  text-black">
                                                <Button
                                                    className={""}
                                                    clickFunc={() => {
                                                        toggleOverlay();
                                                        setMethod("edit");
                                                        setRepoData(data);
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
                                                        setMethod("delete");
                                                        setRepoData(data);
                                                    }}
                                                >
                                                    <i
                                                        className={`bi bi-trash text-xl`}
                                                    ></i>
                                                    hapus
                                                </Button>
                                            </div>
                                        </Dropdown.Content>
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
                                            {reason ?? "Data tidak di temukan"}
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
                        {url === "/balance" &&
                            (method === "edit" ? (
                                <>
                                    <ModalHeader
                                        title={"edit nomor"}
                                        clickFunc={toggleOverlay}
                                        iconTitle={"pencil"}
                                    />

                                    <FormBalance>
                                        <FormBalance.Update
                                            datasFormulir={datasFormulir}
                                            dataEdit={repoData}
                                        />
                                    </FormBalance>
                                </>
                            ) : (
                                <>
                                    <ModalHeader
                                        title={"hapus nomor"}
                                        clickFunc={toggleOverlay}
                                        iconTitle={"trash"}
                                    />

                                    <FormBalance>
                                        <FormBalance.Destroy
                                            dataEdit={repoData}
                                        />
                                    </FormBalance>
                                </>
                            ))}
                    </Card>
                </OverlayModal>
            )}
        </>
    );
};

export default Table;
