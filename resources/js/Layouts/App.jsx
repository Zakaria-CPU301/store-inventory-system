import Navbar from "@/Components/Navigation/Navbar";
import Sidebar from "@/Components/Navigation/Sidebar";

const App = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex bg-[rgb(5,14,31)] w-full min-h-[calc(100vh-4rem)]">
                <Sidebar />
                <main className="p-8 flex-1">{children}</main>
            </div>
        </>
    );
};

export default App;
