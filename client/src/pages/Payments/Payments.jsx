import { useState } from "react";
import { CreditCard, History, CalendarDays, X } from "lucide-react";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MpesaLogo from "../../assets/mpesa.png";
import StripeLogo from "../../assets/stripe.png";

function Payments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentPayments = [
    { date: "2025-04-01", amount: "$1000", status: "Paid" },
    { date: "2025-03-01", amount: "$1000", status: "Paid" },
    { date: "2025-02-01", amount: "$1000", status: "Paid" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold">Rent Payment</h2>
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>Next payment due: May 1, 2025</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Rent
                </button>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm">
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
                    {recentPayments.map((payment, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{payment.date}</td>
                        <td className="px-4 py-2">{payment.amount}</td>
                        <td className="px-4 py-2">
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Choose Payment Method
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 bg-blue-600 text-white py-6 px-4 rounded-xl hover:bg-blue-700 transition">
                <img src={StripeLogo} alt="Stripe" className="h-12 w-18 rounded-sm" />
                <span className="flex-1 text-left">Pay with Stripe</span>
              </button>

              <button className="w-full flex items-center gap-3 bg-green-600 text-white py-6 px-4 rounded-xl hover:bg-green-700 transition">
                <img src={MpesaLogo} alt="M-Pesa" className="h-12 w-18 rounded-sm" />
                <span className="flex-1 text-left">Pay with M-Pesa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
