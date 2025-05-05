import AdminSidebar from "./Sidebar";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import {
  Hammer,
  Wrench,
  Brush,
  Bug,
  Zap,
  Thermometer,
  Wifi,
  HardHat,
  Settings,
} from "lucide-react";

function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTechnicians = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/technicians`);
      return response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error.response?.data?.message || "Failed to fetch technicians.";
    }
  };

  const getIconBySpecialty = (specialty) => {
    const mapping = {
      Plumbing: <Wrench className="text-blue-600 w-6 h-6" />,
      Electrical: <Zap className="text-yellow-500 w-6 h-6" />,
      Carpentry: <Hammer className="text-orange-700 w-6 h-6" />,
      "Pest Control": <Bug className="text-red-600 w-6 h-6" />,
      Painting: <Brush className="text-purple-600 w-6 h-6" />,
      Internet: <Wifi className="text-green-600 w-6 h-6" />,
      HVAC: <Thermometer className="text-cyan-600 w-6 h-6" />,
      Other: <Settings className="text-gray-600 w-6 h-6" />,
    };
    return mapping[specialty] || <HardHat className="text-gray-700 w-6 h-6" />;
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTechnicians();
        setTechnicians(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnicians();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        className="z-20"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-1">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Technicians Directory
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : technicians.length === 0 ? (
            <div className="text-gray-600 text-center p-4 bg-white rounded-lg shadow">
              No technicians found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-start gap-3 hover:shadow-lg transition duration-200"
                  role="article"
                  aria-label={`Technician: ${tech.full_name}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {getIconBySpecialty(tech.specialty)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                        {tech.full_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tech.phone_number}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-gray-200 rounded-full text-gray-700">
                    {tech.specialty}
                  </span>
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

export default Technicians;
