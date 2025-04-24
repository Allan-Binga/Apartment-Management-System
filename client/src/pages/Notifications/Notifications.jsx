import SideBar from "../../components/SideBar";
import { Bath, Maximize, Wallet, Wrench, Bell, User2 } from "lucide-react";
import Navbar from "../../components/Navbar";

function Notifications() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1">
        <SideBar />
      </div>
    </div>
  );
}

export default Notifications;
