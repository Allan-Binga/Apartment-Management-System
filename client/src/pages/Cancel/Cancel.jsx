import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function CancelPage() {
  const navigate = useNavigate();

  const handleRetry = async () => {
    try {
        const response = await axios.post(
          `${endpoint}/checkout/create-checkout-session`,
          {},
          { withCredentials: true }
        );
        const { url } = response.data;
        window.location.href = url;
      } catch (error) {
        console.error("Error creating checkout session", error);
      }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <XCircle className="text-red-500 w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-700">
              Payment Cancelled
            </h1>
            <p className="text-gray-500 mt-2">
              You have not been charged. You can try again anytime.
            </p>
            <button
              onClick={handleRetry}
              className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow transition cursor-pointer"
            >
              Retry Payment
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default CancelPage;
