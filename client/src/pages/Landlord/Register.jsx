import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import signupImage from "../../assets/signup2.jpg";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { endpoint } from "../../apiEndpoint";

function LandlordRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

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
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      {/* Registration Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          Signup as a landlord
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

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");
            setLoading(true);

            try {
              const res = await fetch(`${endpoint}/auth/register/landlord`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              const data = await res.json();

              if (!res.ok) {
                throw new Error(data.message || "Something went wrong.");
              }
              setSuccess(data.message);
              navigate("/login/landlord");
            } catch (error) {
              setError(error.message);
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              inputClass="!w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex flex-col items-center mt-5 sm:mt-6 gap-2 text-sm sm:text-base text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login/landlord" className="text-blue-500 hover:pointer">
              Login
            </Link>
          </p>
          <p>
            Are you an admin?
            <Link to="/login/admin" className="text-blue-500 hover:pointer">
              {" "}
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandlordRegister;
