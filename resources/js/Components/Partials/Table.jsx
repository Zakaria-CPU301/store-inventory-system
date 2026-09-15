import { useContext } from "react";
import Button from "../Elements/Button";
import SmoothTableHead from "../Elements/SmoothTableHead";
import StandardTableHead from "../Elements/StandardTableHead";
import FormBalance from "../Form/FormBalance";
import ModalHeader from "../Elements/ModalHeader";
import Card from "./Card";
import Dropdown, { DropDownContext } from "@/Context/Dropdown";
import { usePage } from "@inertiajs/react";
import { DiscoveryContext } from "@/Context/Discovery";
import FormCategory from "../Form/FormCategory";
import FormUnit from "../Form/FormUnit";
import FormCustomer from "../Form/FormCustomer";

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
}) => {
    const result = (obj, keyName) =>
        keyName.split(".").reduce((acc, key) => acc[key], obj);

    const { open, identity } = useContext(DropDownContext);

    const page = usePage();

    // console.log(usePage());

    // console.log(
    //     page.url === "/attribute" &&
    //         (page.props.attribute === "kategori" ||
    //             page.props.attribute === null),
    // );
    return (
        <>
            <div className="w-full relative">
                <table className="border-collapse w-full bg-main-table rounded-b-2xl">
                    {route().current("customer.index") ? (
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
                                                                        page.url ===
                                                                            "/attribute" &&
                                                                        (page
                                                                            .props
                                                                            .attribute ===
                                                                            "kategori" ||
                                                                            page
                                                                                .props
                                                                                .attribute ===
                                                                                null)
                                                                            ? "edit kategori"
                                                                            : page.url ===
                                                                                    "/attribute" &&
                                                                                page
                                                                                    .props
                                                                                    .attribute ===
                                                                                    "satuan"
                                                                              ? "edit satuan"
                                                                              : page.url ===
                                                                                  "/customer"
                                                                                ? "edit pelanggan"
                                                                                : page.url ===
                                                                                    "/balance"
                                                                                  ? "edit nomor saldo"
                                                                                  : null
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

                                                                {page.url ===
                                                                    "/attribute" &&
                                                                (page.props
                                                                    .attribute ===
                                                                    "kategori" ||
                                                                    page.props
                                                                        .attribute ===
                                                                        null) ? (
                                                                    <FormCategory>
                                                                        <FormCategory.Update
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormCategory>
                                                                ) : page.url ===
                                                                      "/attribute" &&
                                                                  page.props
                                                                      .attribute ===
                                                                      "satuan" ? (
                                                                    <FormUnit>
                                                                        <FormUnit.Update
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormUnit>
                                                                ) : page.url ===
                                                                  "/customer" ? (
                                                                    <FormCustomer>
                                                                        <FormCustomer.Update
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormCustomer>
                                                                ) : page.url ===
                                                                  "/balance" ? (
                                                                    <FormBalance>
                                                                        <FormBalance.Update
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormBalance>
                                                                ) : null}
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
                                                                        page.url ===
                                                                            "/attribute" &&
                                                                        (page
                                                                            .props
                                                                            .attribute ===
                                                                            "kategori" ||
                                                                            page
                                                                                .props
                                                                                .attribute ===
                                                                                null)
                                                                            ? "hapus kategori"
                                                                            : page.url ===
                                                                                    "/attribute" &&
                                                                                page
                                                                                    .props
                                                                                    .attribute ===
                                                                                    "satuan"
                                                                              ? "hapus satuan"
                                                                              : page.url ===
                                                                                  "/customer"
                                                                                ? "hapus pelanggan"
                                                                                : page.url ===
                                                                                    "/balance"
                                                                                  ? "hapus nomor saldo"
                                                                                  : null
                                                                    }
                                                                    closeModal={() =>
                                                                        setModal(
                                                                            false,
                                                                        )
                                                                    }
                                                                    iconTitle={
                                                                        "trash"
                                                                    }
                                                                />

                                                                {page.url ===
                                                                    "/attribute" &&
                                                                (page.props
                                                                    .attribute ===
                                                                    "kategori" ||
                                                                    page.props
                                                                        .attribute ===
                                                                        null) ? (
                                                                    <FormCategory>
                                                                        <FormCategory.Destroy
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormCategory>
                                                                ) : page.url ===
                                                                      "/attribute" &&
                                                                  page.props
                                                                      .attribute ===
                                                                      "satuan" ? (
                                                                    <FormUnit>
                                                                        <FormUnit.Destroy
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormUnit>
                                                                ) : page.url ===
                                                                  "/customer" ? (
                                                                    <FormCustomer setModal={setModal}>
                                                                        <FormCustomer.Destroy
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormCustomer>
                                                                ) : page.url ===
                                                                  "/balance" ? (
                                                                    <FormBalance>
                                                                        <FormBalance.Destroy
                                                                            datasFormulir={
                                                                                datasFormulir
                                                                            }
                                                                            dataColumn={
                                                                                data
                                                                            }
                                                                        />
                                                                    </FormBalance>
                                                                ) : null}
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
