import AccesibillitySecond from "@/Components/Elements/AccesibillitySecond";
import AccessibillityFirst from "@/Components/Elements/AccessibillityFirst";
import Button from "@/Components/Elements/Button";
import SessionInformation from "@/Components/Elements/SessionInformation";
import HeaderAccessibillity from "@/Components/Partials/HeaderAccessibillity";
import HeaderDesc from "@/Components/Partials/HeaderDesc";
import HeaderInfo from "@/Components/Partials/HeaderInfo";
import { ScannerInputContext } from "@/Context/ScannerInput";
import App from "@/Layouts/App";
import { useForm } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

const Transaction = () => {
    const { post, reset, data, setData } = useForm({ codeScan: "" });
    const scanning = (e) => {
        e.preventDefault();
        post(route("transaction.scanning"), {
            onSuccess: () => reset("codeScan"),
        });
    };

    const [show, setShow] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        const inputScanner = document.getElementById("scanner");
        console.log(document.activeElement == inputScanner);

        code === "" && document.activeElement == inputScanner
            ? setShow(true)
            : setShow(false);
    }, []);
    console.log(data.codeScan);

    return (
        <App>
            {({}) => (
                <>
                    <form onSubmit={scanning}>
                        <SessionInformation
                            setShow={setShow}
                            show={show}
                            message={"pemindai telah siap"}
                        />

                        <input
                            id="scanner"
                            autoFocus
                            onFocus={() => setCode("")}
                            type="text"
                            value={code}
                            onChange={(e) => {
                                setData("codeScan", e.target.value);
                                setCode(e.target.value);
                            }}
                            className="bg-white"
                        />
                        <button type="submit"></button>
                    </form>
                </>
                // <>
                //     <HeaderInfo>
                //         <HeaderDesc title={`cetak transaksi`} />
                //     </HeaderInfo>

                //     <HeaderAccessibillity>
                //         <AccessibillityFirst dataFilters={dataFilters} />
                //         <AccesibillitySecond>
                //             <Button className="bg-main-table text-indigo-100 font-bold">
                //                 Filter{" "}
                //                 <i className="bi bi-funnel-fill text-lg text-purple-100"></i>
                //             </Button>
                //             <Button
                //                 className="bg-light-sky text-blue-900 font-bold"
                //                 clickFunc={() => {
                //                     setModal(true);
                //                     setModalContent();
                //                     // <Card className="z-10 bg-powderblue w-4/5 md:w-2/3 min-h-0 px-4 max-h-[calc(80vh)] rounded-2xl">
                //                     //     <ModalHeader
                //                     //         title={
                //                     //             attribute === "satuan"
                //                     //                 ? "tambah satuan baru"
                //                     //                 : "tambah kategori baru"
                //                     //         }
                //                     //         closeModal={() =>
                //                     //             setModal(false)
                //                     //         }
                //                     //     />

                //                     //     {attribute === "satuan" ? (
                //                     //         <FormUnit>
                //                     //             <FormUnit.Create />
                //                     //         </FormUnit>
                //                     //     ) : (
                //                     //         <FormCategory>
                //                     //             <FormCategory.Create />
                //                     //         </FormCategory>
                //                     //     )}
                //                     // </Card>,
                //                 }}
                //             >
                //                 Tambah{" "}
                //                 <i className="bi bi-plus-circle-fill text-lg text-blue-900"></i>
                //             </Button>
                //         </AccesibillitySecond>
                //     </HeaderAccessibillity>
                //     <div className="w-full relative">
                //         <table className="border-collapse w-full bg-main-table rounded-b-2xl">
                //                 <SmoothTableHead columns={columns} />

                //             <tbody className="text-white">
                //                 {datas.length ? (
                //                     datas.map((data, index) => (
                //                         <tr key={index}>
                //                             <td className="text-center p-3">
                //                                 {firstAction ?? index + 1}
                //                             </td>
                //                             {columns.map((col, i) => (
                //                                 <td
                //                                     className={`${col.opsionalClassName ?? "text-center"} p-3`}
                //                                     key={i}
                //                                 >
                //                                     {result(data, col.key)}
                //                                 </td>
                //                             ))}
                //                             <td className="text-center p-3">
                //                                 <Dropdown.Trigger id={data.id}>
                //                                     <i
                //                                         className={`bi bi-three-dots cursor-pointer px-2 py-1 rounded-lg duration-100  ${open && identity === data.id ? "ring-2" : ""}`}
                //                                     ></i>
                //                                 </Dropdown.Trigger>
                //                                 <Dropdown.Content
                //                                     id={data.id}
                //                                     width="w-30"
                //                                     contentClasses="py-2 bg-light-sky"
                //                                     z={"z-10"}
                //                                 >
                //                                     <div className="flex flex-col items-center capitalize justify-start space-y-3  text-black">
                //                                         <Button
                //                                             className={""}
                //                                             clickFunc={() => {
                //                                                 setModal(true);
                //                                                 setModalContent();
                //                                             }}
                //                                         >
                //                                             <i
                //                                                 className={`bi bi-pencil text-xl`}
                //                                             ></i>
                //                                             edit
                //                                         </Button>
                //                                         <Button
                //                                             className={""}
                //                                             clickFunc={() => {
                //                                                 setModal(true);
                //                                                 setModalContent();
                //                                             }}
                //                                         >
                //                                             <i
                //                                                 className={`bi bi-trash text-xl`}
                //                                             ></i>
                //                                             hapus
                //                                         </Button>
                //                                     </div>
                //                                 </Dropdown.Content>
                //                             </td>
                //                         </tr>
                //                     ))
                //                 ) : (
                //                     <tr>
                //                         <td colSpan={100}>
                //                             <div className="flex flex-col justify-center items-center h-52 gap-4">
                //                                 <i
                //                                     className={`${iconEmpty ? iconEmpty : "bi bi-database-fill-x"} text-5xl`}
                //                                 ></i>
                //                                 <span className="text-3xl font-extrabold">
                //                                     {reason ??
                //                                         "Data tidak di temukan"}
                //                                 </span>
                //                             </div>
                //                         </td>
                //                     </tr>
                //                 )}
                //             </tbody>
                //         </table>
                //     </div>
                // </>
            )}
        </App>
    );
};

export default Transaction;
