import LandlordSidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function LandlordHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        < LandlordSidebar/>
      </div>
      <Footer/>
    </div>
  );
}

export default LandlordHome;
