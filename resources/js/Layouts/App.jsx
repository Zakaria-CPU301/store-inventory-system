import Navbar from "@/Components/Navigation/Navbar";
import Sidebar from "@/Components/Navigation/Sidebar";
import { useContext, useState } from "react";
// Global (app defaults)
import { config } from "@inertiajs/react";
import DiscoveryContextProvider from "@/Context/Discovery";
import Dropdown from "@/Context/Dropdown";
import Modal, { ModalContext } from "@/Context/Modal";
import SessionInformasion from "@/Components/Elements/SessionInformasion";

const App = ({ children }) => {
    config.set("form.recentlySuccessfulDuration", 5000);
    const [showSidebar, setShowSidebar] = useState(() => {
        return localStorage.getItem("toggle-sidebar") ?? true;
    });

    function toggleSidebar() {
        const isShow = !showSidebar;
        setShowSidebar(isShow);
        localStorage.setItem("toggle-sidebar", isShow);
    }

    const { modal, setModal, setModalContent } = useContext(ModalContext);

    const [endForm, setEndForm] = useState(false);

    if (endForm) setTimeout(() => setEndForm(false), 5000);
    else false;

    return (
        <>
            <SessionInformasion recentlySuccessful={endForm} />
            <Dropdown>
                <DiscoveryContextProvider>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <div className="flex bg-main-layout w-full min-h-[calc(100vh-4rem)]">
                        {(showSidebar === true || showSidebar === "true") && (
                            <Sidebar />
                        )}
                        <main className="p-8 flex-1 min-w-0 w-full">
                            {children({
                                setModal,
                                setModalContent,
                                setEndForm,
                            })}
                        </main>
                    </div>
                    {modal === true && <Modal.Content />}
                </DiscoveryContextProvider>
            </Dropdown>
        </>
    );
};

export default App;
