import Navbar from "@/Components/Navigation/Navbar";
import Sidebar from "@/Components/Navigation/Sidebar";
import { useContext, useState } from "react";
// Global (app defaults)
import { config } from "@inertiajs/react";
import DiscoveryContextProvider from "@/Context/Discovery";
import Dropdown from "@/Context/Dropdown";
import Modal, { ModalContext } from "@/Context/Modal";

const App = ({ children }) => {
    config.set("form.recentlySuccessfulDuration", 5000);
    const [showSidebar, setShowSidebar] = useState(() => {
        return JSON.parse(localStorage.getItem("toggle-sidebar")) ?? true;
    });

    function toggleSidebar() {
        const isShow = !showSidebar;
        setShowSidebar(isShow);
        localStorage.setItem("toggle-sidebar", isShow);
    }

    const {modal} = useContext(ModalContext);

    return (
        <>
            <Dropdown>
                <DiscoveryContextProvider>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <div className="flex bg-main-layout w-full min-h-[calc(100vh-4rem)]">
                        {showSidebar && <Sidebar />}
                        <main className="p-8 flex-1 min-w-0 w-full">
                            {children}
                        </main>
                    </div>
                    {modal && <Modal.Content />}
                </DiscoveryContextProvider>
            </Dropdown>
        </>
    );
};

export default App;
