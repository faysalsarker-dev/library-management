import { Footer, Navbar } from "@/components/custom";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div >
            <Navbar/>
            <div className="min-h-screen overflow-x-hidden "><Outlet/></div>
            <Footer/>
        </div>
    );
};

export default Root;