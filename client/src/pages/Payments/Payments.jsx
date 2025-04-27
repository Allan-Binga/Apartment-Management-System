import { useEffect, useState } from "react";
import { CreditCard, History, CalendarDays, X } from "lucide-react";
import axios from "axios";
import { endpoint } from "../../apiEndpoint";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MpesaLogo from "../../assets/mpesa.png";
import StripeLogo from "../../assets/stripe.png";
import Spinner from "../../components/Spinner";

function Payments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payments, setPayments] = useState("");
  const [loading, setLoading] = useState(true);

  const recentPayments = async () => {
    try {
      const response = await axios.get(`${endpoint}/payments/my-payments`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchPayouts = async () => {
      setLoading(true);
      try {
        const data = await recentPayments();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, []);

  const handleMpesaClick = () => {
    setIsModalOpen(false);
    setShowMpesaModal(true);
  };

  //Stripe API
  const handleCheckout = async () => {
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

  const handleSubmitMpesa = () => {
    // console.log("Phone:", phoneNumber);
    // Handle M-Pesa logic here
    setShowMpesaModal(false);
    setPhoneNumber("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getNextPaymentDate = (lastPaymentDate) => {
    const paymentDate = new Date(lastPaymentDate);
    paymentDate.setDate(paymentDate.getDate() + 30);
    return paymentDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-white p-10 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold">Rent Payment</h2>
                    <div className="flex items-center text-md text-gray-500 gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>
                        Next payment due:{" "}
                        {payments.length > 0
                          ? getNextPaymentDate(payments[0].paymentdate)
                          : "No payment yet"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Rent
                </button>
              </div>
            </section>

            <section className="bg-white p-10 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Recent Payments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                  <thead className="text-xs uppercase bg-gray-100 text-gray-500">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-center">
                          <div className="scale-50">
                            <Spinner />
                          </div>
                        </td>
                      </tr>
                    ) : payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2">
                            {formatDate(payment.paymentdate)}
                          </td>
                          <td className="px-4 py-2">{payment.amountpaid}</td>
                          <td className="px-4 py-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                              {payment.paymentstatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-4 py-2 text-center text-gray-500 italic"
                        >
                          No payments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Choose Payment Method
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center gap-3 bg-purple-900 text-white py-6 px-4 rounded-xl hover:bg-purple-700 transition cursor-pointer"
              >
                <img
                  src={StripeLogo}
                  alt="Stripe"
                  className="h-12 w-18 rounded-sm"
                />
                <span className="flex-1 text-left">Pay with Stripe</span>
              </button>

              <button
                onClick={handleMpesaClick}
                className="w-full flex items-center gap-3 bg-green-600 text-white py-6 px-4 rounded-xl hover:bg-green-700 transition cursor-pointer"
              >
                <img
                  src={MpesaLogo}
                  alt="M-Pesa"
                  className="h-12 w-18 rounded-sm"
                />
                <span className="flex-1 text-left">Pay with M-Pesa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === M-Pesa Phone Number Modal === */}
      {showMpesaModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Please enter your valid M-pesa number.
            </h2>
            <input
              type="tel"
              placeholder="07XXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-400"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setShowMpesaModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleSubmitMpesa}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
