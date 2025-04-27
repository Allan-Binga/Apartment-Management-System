import { useState } from "react";
import {
  User,
  Home,
  Calendar,
  DollarSign,
  FileText,
  Wrench,
  X,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Profile() {
  // State to manage modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", details: [] });

  // Function to open modal with specific card details
  const openModal = (title, details) => {
    setModalContent({ title, details });
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: "", details: [] });
  };

  // Card data for easier management
  const cards = [
    {
      icon: <User className="text-blue-500" />,
      title: "Personal Info",
      details: [
        "Name: John Doe",
        "Phone: +1 234 567 890",
        "Email: john@example.com",
      ],
    },
    {
      icon: <Home className="text-green-500" />,
      title: "Lease Details",
      details: ["Unit: A-204", "Lease: Jan 2024 - Dec 2024", "Roommates: None"],
    },
    {
      icon: <DollarSign className="text-yellow-500" />,
      title: "Rent & Payments",
      details: ["Monthly Rent: $1,200", "Status: Paid", "Next Due: May 1, 2025"],
    },
    {
      icon: <Wrench className="text-red-500" />,
      title: "Maintenance",
      details: ["Last Request: Apr 10, 2025", "Status: Resolved"],
    },
    {
      icon: <FileText className="text-purple-500" />,
      title: "Documents",
      details: ["Lease.pdf", "Move-in Checklist.pdf"],
    },
    {
      icon: <Calendar className="text-indigo-500" />,
      title: "Upcoming",
      details: ["Inspection: May 15, 2025", "Lease renewal: Dec 1, 2025"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1 bg-gray-50">
        <div className="hidden md:block">
          <SideBar />
        </div>

        <main className="flex-1 p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold">Tenant Profile</h1>
          </div>

          {/* Info Cards */}
          <div className="flex-1 p-4 md:ml-[calc(18rem+2rem)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openModal(card.title, card.details)}
              >
                {card.icon}
                <div>
                  <h2 className="text-lg font-medium">{card.title}</h2>
                  {card.details.map((detail, idx) => (
                    <p key={idx} className="text-md text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/35 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            {modalContent.icon}
            <h2 className="text-2xl font-semibold mb-4">{modalContent.title}</h2>
            <div className="space-y-2">
              {modalContent.details.map((detail, idx) => (
                <p key={idx} className="text-lg text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Profile;