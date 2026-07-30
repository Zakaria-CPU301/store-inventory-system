import Navbar from "@/Components/Navigation/Navbar";
import Sidebar from "@/Components/Navigation/Sidebar";

const App = ({children}) => {
    return (
        <>
            <Navbar />
            <div className="bg-[rgb(5,14,31)] w-full min-h-screen">
                <Sidebar />
                { children }
            </div>
        </>
    );
};

export default App;
