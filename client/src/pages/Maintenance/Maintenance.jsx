import { useState, useEffect } from "react";
import {
  Wrench,
  Send,
  ClipboardEdit,
  Calendar,
  Clock,
  Loader,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";
import Spinner from "../../components/Spinner";
import axios from "axios";

function Maintenance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    issueDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestsLoading, setRequestsLoading] = useState(false);

  const categories = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Pest Control",
    "Painting",
    "Internet",
    "Other",
    "HVAC",
  ];

  const submitMaintenanceRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${endpoint}/maintenance/requests/create`,
        formData,
        { withCredentials: true }
      );
      setSuccess(response.data.message || "Request submitted successfully.");
      setFormData({ category: "", issueDescription: "" });

      await fetchRequests(); // <-- re-fetch fresh requests after submitting
    } catch (error) {
      console.error("Error submitting request:", error);
      setError(
        error.response?.data?.message || "Failed to submit request. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchRequests = async () => {
    try {
      setRequestsLoading(true);
      const response = await axios.get(
        `${endpoint}/maintenance/requests/my-requests`,
        { withCredentials: true }
      );
      setRequests(response.data);
      setFetchError("");
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      setFetchError(
        error.response?.data?.message ||
          "Failed to fetch maintenance requests. Try again."
      );
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusIcon = (status) => {
    if (status === "Pending")
      return <Clock size={16} className="inline mr-1" />;
    if (status === "In Progress")
      return <Loader size={16} className="inline mr-1 animate-spin" />;
    return <CheckCircle size={16} className="inline mr-1 text-green-600" />;
  };

  const markRequestCompleted = async (request_id) => {
    console.log(request_id);
    try {
      await axios.patch(
        `${endpoint}/maintenance/requests/complete/${request_id}`,
        {}, // empty body for PATCH
        { withCredentials: true }
      );
      await fetchRequests();
      setFetchError("");
    } catch (error) {
      console.error("Error marking request as completed:", error);
      setFetchError(
        error.response?.data?.message || "Failed to update request status."
      );
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        className="z-10 w-full"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 bg-gray-50 w-full">
        <SideBar />
        <main className="flex-1 p-4 sm:p-6 md:ml-[calc(18rem+2rem)]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wrench className="w-6 h-6 sm:w-7 sm:h-7" /> Maintenance Requests
          </h2>

          <form
            onSubmit={submitMaintenanceRequest}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md mb-6 sm:mb-8 max-w-full sm:max-w-xl"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Submit a new
              request
            </h3>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm sm:text-base">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm sm:text-base">
                {success}
              </div>
            )}

            <div className="mb-4">
              <label className="block font-medium text-gray-700 text-sm sm:text-base">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm sm:text-base"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 text-sm sm:text-base">
                Description
              </label>
              <textarea
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm sm:text-base"
                rows="4"
                placeholder="Describe the issue in detail"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-md hover:bg-blue-700 flex items-center gap-2 cursor-pointer disabled:bg-gray-400 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Spinner className="w-4 h-4 sm:w-5 sm:h-5" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Submit Request
                </>
              )}
            </button>
          </form>

          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Recent Maintenance Requests
          </h2>

          {fetchError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm sm:text-base">
              {fetchError}
            </div>
          )}

          {requestsLoading ? (
            <div className="flex justify-center items-center p-6 sm:p-10">
              <Spinner className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.request_id}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-center flex-col sm:flex-row gap-3 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <ClipboardEdit className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                      {req.category}
                    </h3>
                    <span
                      className={`text-xs sm:text-sm px-2 py-1 rounded flex items-center ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getStatusIcon(req.status)}
                      {req.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-3">
                    {req.issue_description}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                    {formatDate(req.request_date)}
                  </p>

                  {req.status === "Pending" && (
                    <button
                      onClick={() => markRequestCompleted(req.request_id)}
                      className="mt-3 bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-green-700 text-xs sm:text-sm"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Maintenance;
