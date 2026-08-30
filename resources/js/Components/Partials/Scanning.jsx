import { useContext, useEffect } from "react";

import { ModalContext } from "@/Context/Modal";
import { Html5Qrcode } from "html5-qrcode";

const Scanning = ({}) => {
    const { modal } = useContext(ModalContext);

    useEffect(() => {
        const scanner = new Html5Qrcode("barcode-scanner");

        scanner
            .start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: {
                        width: 350,
                        height: 200,
                    },
                    aspectRatio: 1.777778,
                },
                (decodedText, decodedResult) => {
                    console.log("Barcode:", decodedText);
                    console.log("Result:", decodedResult);
                },
                (errorMessage) => {
                    // Jangan console.log ini terus-menerus,
                    // karena akan dipanggil ketika frame belum berhasil decode.
                },
            )
            .catch((err) => {
                console.error("Scanner error:", err);
            });

        // return () => {
        //     scanner
        //         .stop()
        //         .then(() => {
        //             scanner.clear();
        //         })
        //         .catch((err) => {
        //             console.error("Stop scanner error:", err);
        //         });
        // };
    }, [modal]);

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col w-1/2 h-full border-r-4 border-dashed border-black/70">
                <h1 className="font-extrabold text-2xl text-black/90">
                    Scan Barcode
                </h1>

                <div className="flex justify-center items-center pr-4 w-full h-full">
                    <div
                        id="barcode-scanner"
                        className={`flex w-full`}
                    ></div>
                </div>
            </div>
            <div className="w-1/2 h-full flex px-4">
                <h1 className="font-extrabold text-2xl text-black/90">Hasil</h1>
            </div>
        </div>
    );
};

export default Scanning;
