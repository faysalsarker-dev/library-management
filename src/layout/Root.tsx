import { Navbar } from "@/components/custom";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div >
            <Navbar/>
            <div className="min-h-screen overflow-x-hidden "><Outlet/></div>
        </div>
    );
};

export default Root;