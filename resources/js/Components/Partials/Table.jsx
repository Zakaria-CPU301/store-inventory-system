import { useContext } from "react";
import Button from "../Elements/Button";
import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";
import FormBalance from "../Form/FormBalance";
import ModalHeader from "../Elements/ModalHeader";
import Card from "./Card";
import Dropdown, { DropDownContext } from "@/Context/Dropdown";

const Table = ({
    firstAction = null,
    columns,
    datas,
    iconEmpty,
    reason,
    datasFormulir = null,
    className,
    setModal,
    setModalContent,
    setEndForm
}) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

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
                                                        setModal(true);
                                                        setModalContent(
                                                            <Card className="bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                                                                <ModalHeader
                                                                    title={
                                                                        "edit nomor"
                                                                    }
                                                                    closeModal={() =>
                                                                        setModal(
                                                                            false,
                                                                        )
                                                                    }
                                                                    iconTitle={
                                                                        "pencil"
                                                                    }
                                                                />

                                                                <FormBalance setEndForm={setEndForm}>
                                                                    <FormBalance.Update
                                                                        datasFormulir={
                                                                            datasFormulir
                                                                        }
                                                                        dataEdit={
                                                                            data
                                                                        }
                                                                    />
                                                                </FormBalance>
                                                            </Card>,
                                                        );
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
                                                        setModal(true);
                                                        setModalContent(
                                                            <Card className="bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                                                                <ModalHeader
                                                                    title={
                                                                        "hapus nomor"
                                                                    }
                                                                    closeModal={() =>
                                                                        setModal(false)
                                                                    }
                                                                    iconTitle={
                                                                        "trash"
                                                                    }
                                                                />

                                                                <FormBalance setModal={setModal} setEndForm={setEndForm}>
                                                                    <FormBalance.Destroy
                                                                        dataEdit={
                                                                            data
                                                                        }
                                                                    />
                                                                </FormBalance>
                                                            </Card>,
                                                        );
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
        </>
    );
};

export default Table;
