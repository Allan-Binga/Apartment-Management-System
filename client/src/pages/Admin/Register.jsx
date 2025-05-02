import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import signupImage from "../../assets/admin.jpg";
import { endpoint } from "../../apiEndpoint";

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required.";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
    if (!formData.password.trim()) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${endpoint}/auth/register/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.toLowerCase().includes("password")) {
          setFieldErrors({ password: data.message });
        } else {
          toast.error(data.message || "Something went wrong.");
        }
        return;
      }

      toast.success(data.message || "Registration successful!");
      setTimeout(() => navigate("/login/admin"), 3500);
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${signupImage})` }}
    >
      <ToastContainer position="top-right" autoClose={3500} transition={Bounce} />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Administrator Signup
        </h1>
        <p className="text-gray-600 mt-2 text-center text-sm">
          Enter your details below
        </p>

        {loading && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {["firstName", "lastName"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${
                    field === "firstName" ? "first" : "last"
                  } name`}
                  className={`mt-1 block w-full border ${
                    fieldErrors[field] ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 ${
                    fieldErrors[field]
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {fieldErrors[field] && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors[field]}</p>
                )}
              </div>
            ))}
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
              className={`mt-1 block w-full border ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 ${
                fieldErrors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
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
              country="ke"
              enableSearch
              disableCountryCode
              disableDropdown
              placeholder="0712345678"
              containerClass="w-full mt-1"
              inputClass="!w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fieldErrors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneNumber}</p>
            )}
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
              className={`mt-1 block w-full border ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 ${
                fieldErrors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
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
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
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

            <div className="flex flex-col items-center mt-6 gap-2 text-sm text-gray-600">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login/admin"
                      className="text-blue-500 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                  <p>
                    Are you a landlord?{" "}
                    <Link to="/login/landlord" className="text-blue-500 hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
      </div>
    </div>
  );
}

export default AdminRegister;
