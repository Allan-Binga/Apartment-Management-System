import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Banknote, CalendarDays, History, Loader2 } from "lucide-react";
import { endpoint } from "../../apiEndpoint";
import axios from "axios";

function LandlordPayments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    try {
      const response = await axios.get(`${endpoint}/payments/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Simple date formatter
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        className="z-10"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:pl-80 bg-gray-50">
          <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Header */}
            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Banknote className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-semibold">Tenant Payments</h2>
              </div>
              <p className="text-gray-600 text-sm">
                View all rent payments made by your tenants.
              </p>
            </section>

            {/* Payments Table */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Recent Payments</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600 hidden sm:table">
                  <thead className="text-xs uppercase bg-gray-100 text-gray-500">
                    <tr>
                      <th className="px-4 py-2">Tenant</th>
                      <th className="px-4 py-2">Apartment</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-6 text-center">
                          <Loader2 className="animate-spin w-6 h-6 text-gray-400 mx-auto" />
                        </td>
                      </tr>
                    ) : payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2">{payment.tenantname}</td>
                          <td className="px-4 py-2">
                            {payment.apartmentnumber}
                          </td>
                          <td className="px-4 py-2">
                            {formatDate(payment.paymentdate)}
                          </td>
                          <td className="px-4 py-2">
                            Ksh {payment.amountpaid}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                payment.paymentstatus === "paid"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {payment.paymentstatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-6 text-center text-gray-500 italic"
                        >
                          No payments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Mobile View */}
                <div className="sm:hidden space-y-4">
                  {loading ? (
                    <div className="text-center">
                      <Loader2 className="animate-spin w-6 h-6 text-gray-400 mx-auto" />
                    </div>
                  ) : payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tenant:</span>{" "}
                          {payment.tenantname}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Apartment:</span>{" "}
                          {payment.apartmentnumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(payment.paymentdate)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Amount:</span> Ksh{" "}
                          {payment.amountpaid}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              payment.paymentstatus === "paid"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {payment.paymentstatus}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 italic">
                      No payments found.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default LandlordPayments;
