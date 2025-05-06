import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../assets/signup.jpg";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../../apiEndpoint"; //BACKEND API

function TenantRegister() {
  const apartmentOptions = getApartments();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    apartmentNumber: "",
    leaseStartDate: "",
    leaseEndDate: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  //Apartment options
  function getApartments() {
    return [
      "A 101",
      "A 102",
      "A 103",
      "A 104",
      "A 105",
      "B 101",
      "B 102",
      "B 103",
      "B 104",
      "B 105",
      "C 101",
      "C 102",
      "C 103",
      "C 104",
      "C 105",
    ];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${signupImage})`,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      {/* Registration Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          Signup as Tenant
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">
          Enter your details below
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mt-4">{success}</p>
        )}
        {loading && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");
            setLoading(true);
            try {
              const res = await fetch(`${endpoint}/auth/register/tenant`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });

              const data = await res.json();

              if (!res.ok) {
                // Handle password-specific errors gracefully
                if (data.message?.toLowerCase().includes("password")) {
                  setFieldErrors({ password: data.message });
                } else {
                  setFieldErrors({});
                  toast.error(data.message || "Something went wrong.");
                }
                return;
              }

              setFieldErrors({});
              toast.success(data.message);
              setTimeout(() => navigate("/login/tenant"), 3500);
            } catch (err) {
              toast.error("Server error. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-5 sm:gap-6 mt-6 sm:mt-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }
              country={"ke"}
              enableSearch
              containerClass="w-full mt-1"
              inputClass="!w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apartment Number
            </label>
            <select
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select apartment number
              </option>
              {apartmentOptions.map((apt, index) => (
                <option key={index} value={apt}>
                  {apt}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease Start Date
              </label>
              <span className="block text-xs text-gray-500 mt-1">
               Not prior to today.
              </span>
              <input
                type="date"
                name="leaseStartDate"
                value={formData.leaseStartDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease End Date
              </label>
              <span className="block text-xs text-gray-500 mt-1">
                Must be at least 2 months after the lease start date.
              </span>
              <input
                type="date"
                name="leaseEndDate"
                value={formData.leaseEndDate}
                onChange={handleChange}
                min={formData.leaseStartDate}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  setFieldErrors((prev) => ({ ...prev, password: "" })); // Clear error on input
                }}
                placeholder="Enter a strong password"
                className={`mt-1 block w-full border ${
                  fieldErrors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 ${
                  fieldErrors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition duration-200 text-base cursor-pointer ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Signup
          </button>
        </form>

        <div className="flex flex-col items-center mt-6 gap-3 text-sm sm:text-base text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login/tenant" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <p>
            Are you a landlord?{" "}
            <Link
              to="/signup/landlord"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register here
            </Link>
          </p>
          <p>
            Are you an admin?{" "}
            <Link
              to="/login/admin"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenantRegister;
