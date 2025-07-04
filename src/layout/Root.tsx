import { Footer, Navbar } from "@/components/custom";
import ScrollToTop from "@/components/custom/ScrollToTop";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <div >
            <Navbar/>
            <ScrollToTop />
            <div className="min-h-screen overflow-x-hidden "><Outlet/></div>
            <Footer/>
        </div>
    );
};

export default Root;