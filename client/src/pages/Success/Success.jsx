import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
import { CheckCircle } from "lucide-react";

function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-700">
              Payment Successful
            </h1>
            <p className="text-gray-500 mt-2">
              Thank you! Your rent has been received.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SuccessPage;
