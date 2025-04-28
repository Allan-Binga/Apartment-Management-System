import { useState, useEffect } from "react";
import axios from "axios";
import LandlordSidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import { endpoint } from "../../apiEndpoint";
import { Bath, Maximize, Pencil, Trash, PlusCircle, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Listings() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    square_feet: "",
    apartmentnumber: "",
    image: "",
  });

  const getListings = async () => {
    try {
      const response = await axios.get(`${endpoint}/listings/all-listings`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getListings();
      setListings(data);
    };
    fetchListings();
  }, []);

  const handleCardClick = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (listing) => {
    setIsUpdateModalOpen(true);
  };

  //Opens the add listing modal
  const handleAddListingClick = () => {
    setIsAddListingOpen(true);
    setFormData({
      title: "",
      description: "",
      price: "",
      square_feet: "",
      apartmentNumber: "",
      image: "",
    });
  };

  //Creating a Listing
  const createListing = async () => {
    setIsAddListingOpen(false);
    try {
      await axios.post(`${endpoint}/listings/create-listing`, formData);
      setIsAddListingOpen(false);
      const updatedListings = await getListings();
      setListings(updatedListings);
      toast.success("Listing added successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add listing.");
    }
  };

  //Update a listing
  const updateListing = async () => {
    try {
      await axios.put(
        `${endpoint}/listings/update-listing/${selectedListing.id}`,
        formData
      );
      setIsUpdateModalOpen(false);

      // Refetch listings after the update
      const updatedListings = await getListings();
      setListings(updatedListings);
      toast.success("Listing updated successfully.");
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing.");
    }
  };

  //Handles deleting a listing
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoint}/listings/delete-listing/${id}`);
      setIsModalOpen(false);
      const updatedListings = await getListings();
      setListings(updatedListings);
      toast.success("Listing deleted.");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert(error.response?.data?.message || "Could not delete listing.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1">
        <LandlordSidebar />

        <main className="flex-1 ml-[calc(18rem+2rem)] p-6">
          {/* Add Apartment Listing Button */}
          <div className="flex justify-end mb-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-blue-600 transition cursor-pointer"
              onClick={handleAddListingClick}
            >
              <PlusCircle className="w-5 h-5" />
              Add an Apartment Listing
            </button>
          </div>

          {/* Apartment Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((apt) => (
              <div
                key={apt.id}
                onClick={() => handleCardClick(apt)}
                className={`group bg-white rounded-xl cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 
          border border-gray-200 ${apt.leased ? "ring-2 ring-green-400" : ""}`}
              >
                {/* Image Section */}
                <div className="relative h-64">
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="w-full h-full object-cover rounded-t-xl rounded-b-none"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {/* Bedroom Tag */}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {apt.beds === "studio"
                        ? "Studio"
                        : `${apt.beds || 2} Bedroom`}
                    </span>

                    {/* Leased Tag */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
                        apt.leased
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {apt.leasingstatus ? "Leased" : "Available"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {apt.title}
                  </h2>
                  <p className="text-sm text-gray-600">{apt.description}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Kes. {apt.price}
                    </span>
                  </div>

                  {/* Beds and Baths */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
                      <Bath className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {apt.baths || 1} Baths
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
                      <Maximize className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {apt.square_feet || 1200} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {/* Property Modal */}
      {isModalOpen && selectedListing && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md space-y-6 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedListing.title}
            </h2>
            <img
              src={selectedListing.image}
              alt={selectedListing.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-gray-600">{selectedListing.description}</p>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-blue-500">
                  Kes. {selectedListing.price}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Beds / Baths</p>
                <p className="text-md text-gray-700">
                  {selectedListing.beds} Beds, {selectedListing.baths} Baths
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="flex items-center justify-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-md w-full hover:bg-blue-500 transition cursor-pointer"
                onClick={() => {
                  setIsModalOpen(false); // Close current details
                  setFormData({
                    title: selectedListing.title,
                    description: selectedListing.description,
                    price: selectedListing.price,
                    square_feet: selectedListing.square_feet,
                    apartmentnumber: selectedListing.apartmentnumber,
                    image: selectedListing.image,
                  });
                  setIsUpdateModalOpen(true); // Open Update modal
                }}
              >
                <Pencil className="w-5 h-5" />
                Update
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-red-400 text-white px-4 py-2 rounded-md w-full hover:bg-red-500 transition cursor-pointer"
                onClick={() => handleDelete(selectedListing.id)}
              >
                <Trash className="w-5 h-5 font-semibold" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Property Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg space-y-6 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute h-5 w-6 top-2 right-2 text-gray-700 hover:text-gray-600 cursor-pointer"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800">Update Listing</h2>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                updateListing()
              }}
            >
              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (Kes)
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    placeholder="Square Feet"
                    value={formData.square_feet}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        square_feet: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Apartment Number
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment Number"
                    value={formData.apartmentnumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        apartmentnumber: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                >
                  Update Listing
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {isAddListingOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg space-y-6 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsAddListingOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800">
              Add New Listing
            </h2>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                createListing();
              }}
            >
              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (Kes)
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    placeholder="Square Feet"
                    value={formData.square_feet}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        square_feet: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Apartment Number
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment Number"
                    value={formData.apartmentnumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        apartmentnumber: e.target.value,
                      })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="gap-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                >
                  Add Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listings;
