import { useContext, useEffect } from "react";

import { ModalContext } from "@/Context/Modal";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanning = ({ modal }) => {
    // const { modal } = useContext(ModalContext);
    console.log(modal);
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("render", {
            // 1. Tentukan FPS yang ideal (10-15 sudah cukup, terlalu tinggi membebani CPU)
            fps: 10,

            // 2. Berikan kotak pemandu agar area render canvas lebih fokus dan kecil
            qrbox: { width: 250, height: 250 },

            // 3. AKTIFKAN FITUR EXPERIMENTAL UTAMA
            experimentalFeatures: {
                // Menggunakan engine barcode native bawaan OS/Browser jika tersedia (Sangat Ampuh!)
                useBarCodeDetectorIfSupported: true,
            },

            // 4. Pengaturan aspek rasio kamera belakang
            aspectRatio: 1.7777778, // Menggunakan rasio 16:9 agar gambar tidak terdistorsi
        });

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText, decodedResult) {
            console.log(`Scan sukses: ${decodedText}`);
            scanner.clear(); // Hentikan scanner setelah berhasil
        }

        function onScanFailure(error) {
            // Kegagalan frame per frame, biarkan kosong agar tidak membebani log
        }

        return () => {
            scanner
                .clear()
                .catch((error) =>
                    console.error("Gagal membersihkan scanner", error),
                );
        };
    }, [modal]);

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col w-1/2 h-full border-r-4 border-dashed border-black/70">
                <h1 className="font-extrabold text-2xl text-black/90">
                    Scan Barcode
                </h1>

                <div className="flex justify-center items-center pr-4 w-full h-full">
                    <div id="render" className={`flex w-full`}></div>
                </div>
            </div>
            <div className="w-1/2 h-full flex px-4">
                <h1 className="font-extrabold text-2xl text-black/90">Hasil</h1>
            </div>
        </div>
    );
};

export default Scanning;
