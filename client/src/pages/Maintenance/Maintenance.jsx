import { useState } from "react";
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
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

const submitMaintenanceRequest = async () => {
  try {
    const response = await axios.post()
  } catch (error) {
    
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    };
    setRequests([newRequest, ...requests]);
    setForm({ title: "", description: "" });
  };

  const getStatusIcon = (status) => {
    if (status === "Pending")
      return <Clock size={16} className="inline mr-1" />;
    if (status === "In Progress")
      return <Loader size={16} className="inline mr-1 animate-spin" />;
    return <CheckCircle size={16} className="inline mr-1 text-green-600" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1 bg-gray-50">
        <SideBar />
        <main className="flex-1 ml-[calc(18rem+2rem)] p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wrench size={30} /> Maintenance Requests
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-2xl shadow-md mb-8 max-w-xl"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <PlusCircle size={24} /> Submit a new request.
            </h3>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-3  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
                placeholder="Short summary (e.g., Leaking sink)"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-100"
                rows="4"
                placeholder="Describe the issue in detail"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
            >
              <Send size={16} /> Submit Request
            </button>
          </form>

          <h2 className="text-2xl font-bold mb-4">
            Recent Maintenance Requests
          </h2>
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-4 rounded-2xl shadow-md border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ClipboardEdit size={18} /> {req.title}
                  </h3>
                  <span
                    className={`text-sm px-2 py-1 rounded flex items-center ${
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
                <p className="text-gray-600 mt-1">{req.description}</p>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <Calendar size={14} /> {req.date}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Maintenance;
