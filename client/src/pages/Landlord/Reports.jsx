import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { FileText, Clock, Wrench, Wallet } from "lucide-react";

function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const recentReports = async () => {
    try {
      const response = await axios.get(`${endpoint}/reports`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await recentReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const maintenanceReports = reports.filter(
    (report) => report.report_type?.toLowerCase() === "maintenance"
  );
  const paymentReports = reports.filter(
    (report) => report.report_type?.toLowerCase() === "payment"
  );

  const ReportTable = ({ data, title, isPayment, Icon }) => (
    <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-gray-600" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600 hidden sm:table">
          <thead className="text-xs uppercase bg-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Type</th>
              {isPayment && <th className="px-4 py-2">Amount Paid</th>}
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={isPayment ? 5 : 4}
                  className="px-4 py-6 text-center"
                >
                  <Spinner />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((report, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2">{report.tenant_name}</td>
                  <td className="px-4 py-2">{report.report_type}</td>
                  {isPayment && (
                    <td className="px-4 py-2">
                      {report.amount_paid
                        ? `Ksh ${parseFloat(report.amount_paid).toFixed(2)}`
                        : "N/A"}
                    </td>
                  )}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.payment_status === "paid" ||
                        report.maintenance_status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {report.payment_status ||
                        report.maintenance_status ||
                        "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(report.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isPayment ? 5 : 4}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : data.length > 0 ? (
            data.map((report, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tenant:</span>{" "}
                  {report.tenant_name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span>{" "}
                  {report.report_type}
                </p>
                {isPayment && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Amount:</span>{" "}
                    {report.amount_paid
                      ? `Ksh ${parseFloat(report.amount_paid).toFixed(2)}`
                      : "N/A"}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      report.payment_status === "paid" ||
                      report.maintenance_status === "resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {report.payment_status ||
                      report.maintenance_status ||
                      "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(report.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              No reports found.
            </p>
          )}
        </div>
      </div>
    </section>
  );

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
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Tenant Reports</h2>
              </div>
              <p className="text-gray-600 text-sm">
                View all reports related to maintenance, payments, or other
                tenant interactions.
              </p>
            </section>

            {/* Maintenance Reports */}
            <ReportTable
              title="Maintenance Reports"
              data={maintenanceReports}
              isPayment={false}
              Icon={Wrench}
            />

            {/* Payment Reports */}
            <ReportTable
              title="Payment Reports"
              data={paymentReports}
              isPayment={true}
              Icon={Wallet}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Reports;
