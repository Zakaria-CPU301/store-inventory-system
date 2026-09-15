import Navbar from "@/Components/Navigation/Navbar";
import Sidebar from "@/Components/Navigation/Sidebar";
import { useContext, useEffect, useState } from "react";
// Global (app defaults)
import { config, usePage } from "@inertiajs/react";
import DiscoveryContextProvider from "@/Context/Discovery";
import Dropdown from "@/Context/Dropdown";
import Modal, { ModalContext } from "@/Context/Modal";
import SessionInformasion from "@/Components/Elements/SessionInformasion";
import Scanning from "@/Components/Partials/Scanning";

const App = ({ children }) => {
    config.set("form.recentlySuccessfulDuration", 3000); // recentlySuccessful from useForm()
    const [showSidebar, setShowSidebar] = useState(() => {
        return localStorage.getItem("toggle-sidebar") ?? true;
    });

    function toggleSidebar() {
        const isShow = !showSidebar;
        setShowSidebar(isShow);
        localStorage.setItem("toggle-sidebar", isShow);
    }

    const { modal, setModal, setModalContent } = useContext(ModalContext);

    const { flash } = usePage();
    const [endForm, setEndForm] = useState(false);

    useEffect(
        () => (flash.success ? setEndForm(true) : setEndForm(false)),
        [flash],
    );

    if (endForm) setTimeout(() => setEndForm(false), 3000);

    return (
        <>
            <SessionInformasion recentlySuccessful={endForm} />
            <Dropdown>
                <DiscoveryContextProvider>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <div className="flex bg-main-layout w-full min-h-[calc(100vh-4rem)]">
                        {(showSidebar === true || showSidebar === "true") && (
                            <Sidebar modal={modal} setModal={setModal} setModalContent={setModalContent} />
                        )}
                        <main className="p-8 flex-1 min-w-0 w-full">
                            {children({
                                setModal,
                                setModalContent,
                            })}
                        </main>
                    </div>
                    {modal && <Modal.Content />}
                </DiscoveryContextProvider>
            </Dropdown>
        </>
    );
};

export default App;
