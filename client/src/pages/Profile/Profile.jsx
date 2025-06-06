import { useState, useEffect } from "react";
import {
  User,
  Home,
  Calendar,
  DollarSign,
  FileText,
  Wrench,
  X,
} from "lucide-react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";

const id = localStorage.getItem("tenantId") || null;

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", details: [] });
  const [tenant, setTenant] = useState({
    firstname: "N/A",
    lastname: "",
    phonenumber: "N/A",
    email: "N/A",
    apartmentnumber: "N/A",
    leasestartdate: null,
    leaseenddate: null,
    apartmentPrice: null,
    nextPaymentDate: null,
    lastMaintenanceDate: null,
    latestMaintenanceStatus: "N/A",
    pdf: [],
  });

  const openModal = (title, details) => {
    setModalContent({ title, details });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: "", details: [] });
  };

  const getTenantDetails = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/tenants/${id}`);
      setTenant(response.data);
    } catch (error) {
      console.error("Failed to fetch tenant:", error);
    }
  };

  useEffect(() => {
    getTenantDetails();
  }, []);

  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const cards = [
    {
      icon: <User className="text-blue-500 w-5 sm:w-6 h-5 sm:h-6" />,
      title: "Personal Info",
      details: [
        `Name: ${tenant.firstname} ${tenant.lastname}`,
        `Phone: ${tenant.phonenumber}`,
        `Email: ${tenant.email}`,
      ],
    },
    {
      icon: <Home className="text-green-500 w-5 sm:w-6 h-5 sm:h-6" />,
      title: "Lease Details",
      details: [
        `Unit: ${tenant.apartmentnumber || "N/A"}`,
        `Lease: ${
          tenant.leasestartdate ? formatDate(tenant.leasestartdate) : "?"
        } - ${tenant.leaseenddate ? formatDate(tenant.leaseenddate) : "?"}`,
      ],
    },
    {
      icon: <DollarSign className="text-yellow-500 w-5 sm:w-6 h-5 sm:h-6" />,
      title: "Rent & Payments",
      details: [
        `Monthly Rent: ${
          tenant.apartmentPrice ? `Kes. ${tenant.apartmentPrice}` : "N/A"
        }`,
        `Next Due: ${
          tenant.nextPaymentDate ? formatDate(tenant.nextPaymentDate) : "N/A"
        }`,
      ],
    },
    {
      icon: <Wrench className="text-red-500 w-5 sm:w-6 h-5 sm:h-6" />,
      title: "Maintenance",
      details: [
        `Last Request: ${
          tenant.lastMaintenanceDate
            ? formatDate(tenant.lastMaintenanceDate)
            : "N/A"
        }`,
        `Status: ${tenant.latestMaintenanceStatus || "N/A"}`,
      ],
    },
    {
      icon: <FileText className="text-purple-500 w-5 sm:w-6 h-5 sm:h-6" />,
      title: "Documents",
      details: tenant.pdf?.length ? tenant.pdf : ["No documents uploaded"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        className="z-10"
      />

      <div className="flex flex-1">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 space-y-6 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-64 ml-0" : "lg:ml-64 ml-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Tenant Profile
            </h1>
          </div>

          <div className="space-y-6">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl p-4 sm:p-6 h-48 flex items-start space-x-3 sm:space-x-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openModal(card.title, card.details)}
                >
                  <div className="flex-shrink-0">{card.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold">
                      {card.title}
                    </h3>
                    <ul className="mt-2 text-xs sm:text-sm text-gray-600 space-y-1">
                      {card.details.map((detail, i) => (
                        <li key={i} className="truncate">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md relative max-h-[80vh] overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                  <User className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
                  <span>{modalContent.title}</span>
                </h2>
                <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
                  {modalContent.details.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;