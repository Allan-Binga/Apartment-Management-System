import { useState, useEffect } from "react";
import LandlordSidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { User, Trash, Pen, Menu, X } from "lucide-react";
import { endpoint } from "../../apiEndpoint";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Tenants() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [updatedApartmentNumber, setUpdatedApartmentNumber] = useState("");
  const [updatedLeaseEndDate, setUpdatedLeaseEndDate] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // API Call to fetch tenants
  const getTenants = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/tenants`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch tenants";
    }
  };

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      try {
        const data = await getTenants();
        setTenants(data);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const openUpdateModal = (tenant) => {
    setSelectedTenant(tenant);
    setUpdatedApartmentNumber(tenant.apartmentnumber || "");
    setUpdatedLeaseEndDate(tenant.leaseenddate || "");
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTenant(null);
    setUpdatedApartmentNumber("");
    setUpdatedLeaseEndDate("");
    setIsUpdateModalOpen(false);
  };

  const confirmDelete = (tenant) => {
    setTenantToDelete(tenant);
    setIsDeleteModalOpen(true);
  };

  // API Call to Update tenant details
  const handleUpdate = async () => {
    if (!updatedApartmentNumber.trim()) {
      alert("Please enter a valid apartment number.");
      return;
    }

    try {
      const response = await axios.put(
        `${endpoint}/tenants/landlord/update/${selectedTenant.id}`,
        {
          apartmentnumber: updatedApartmentNumber,
          leaseEndDate: updatedLeaseEndDate || null,
        },
        { withCredentials: true }
      );

      const updatedTenant = response.data.tenant;
      setTenants((prevTenants) =>
        prevTenants.map((t) => (t.id === updatedTenant.id ? updatedTenant : t))
      );
      toast.success("Updated tenant details.");
      closeModal();
    } catch (error) {
      console.error("Failed to update tenant:", error);
      toast.error(error.response?.data?.message || "Failed to update tenant.");
    }
  };

  // API call to delete tenants
  const handleDeleteTenant = async () => {
    try {
      await axios.delete(
        `${endpoint}/tenants/landlord/remove/${tenantToDelete.id}`,
        { withCredentials: true }
      );

      setTenants((prevTenants) =>
        prevTenants.filter((t) => t.id !== tenantToDelete.id)
      );
      toast.success("Tenant deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete tenant.");
    } finally {
      setIsDeleteModalOpen(false);
      setTenantToDelete(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        className="z-10"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <LandlordSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 w-full md:ml-72">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Tenants
          </h1>

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <User className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {tenant.firstname} {tenant.lastname}
                      </h2>
                      <p className="text-sm sm:text-md text-gray-500">
                        {tenant.apartmentnumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm sm:text-md text-gray-600 space-y-1">
                    <p>
                      <strong>ID:</strong> {tenant.id}
                    </p>
                    <p>
                      <strong>Email:</strong> {tenant.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {tenant.phonenumber}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {tenant.isverified ? (
                        <span className="text-green-600 font-semibold">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Unverified
                        </span>
                      )}
                    </p>
                    <p>
                      <strong>Lease Start:</strong>{" "}
                      {tenant.leasestartdate
                        ? formatDate(tenant.leasestartdate)
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Lease End:</strong>{" "}
                      {tenant.leaseenddate
                        ? formatDate(tenant.leaseenddate)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => openUpdateModal(tenant)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit tenant ${tenant.firstname} ${tenant.lastname}`}
                    >
                      <Pen className="w-5 sm:w-6 h-5 sm:h-6" />
                    </button>
                    <button
                      onClick={() => confirmDelete(tenant)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete tenant ${tenant.firstname} ${tenant.lastname}`}
                    >
                      <Trash className="w-5 sm:w-6 h-5 sm:h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Update Tenant Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Update Tenant Details
            </h2>
            <p className="text-sm text-gray-600">
              Updating for:{" "}
              <strong>
                {selectedTenant?.firstname} {selectedTenant?.lastname}
              </strong>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apartment Number
                </label>
                <input
                  type="text"
                  value={updatedApartmentNumber}
                  onChange={(e) => setUpdatedApartmentNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new apartment number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lease End Date
                </label>
                <input
                  type="date"
                  value={updatedLeaseEndDate}
                  onChange={(e) => setUpdatedLeaseEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={closeModal}
                className="px-3 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tenant Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-red-600">
              Delete Tenant
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Are you sure you want to delete this user? <br />
              <strong>This action is permanent and cannot be undone.</strong>
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTenant}
                className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Tenants;
