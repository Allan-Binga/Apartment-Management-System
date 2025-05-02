import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../assets/signup.jpg";
import { Eye, EyeOff } from "lucide-react";
import { endpoint } from "../../apiEndpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";

function TenantLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${endpoint}/auth/login/tenant`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("tenantId", data.tenant.id);

      toast.success("Login successful!", {
        className:
          "bg-green-100 text-green-800 font-medium rounded-md p-3 shadow",
      });
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        className: "bg-red-100 text-red-800 font-medium rounded-md p-3 shadow",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 sm:px-8 lg:px-10"
      style={{ backgroundImage: `url(${signupImage})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-lg bg-white shadow-md border-l-4 border-blue-500 p-4 text-sm text-gray-800"
        bodyClassName="flex items-center"
        progressClassName="bg-blue-400 h-1 rounded"
      />
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          Tenant Login
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">
          Enter your credentials
        </p>

        {loading && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 sm:gap-6 mt-5 sm:mt-6"
        >
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
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
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
            className={
              "w-full py-3 font-semibold rounded-lg transition duration-200 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }
          >
            Login
          </button>
        </form>

        <div className="flex flex-col items-center mt-5 sm:mt-6 gap-2 text-sm sm:text-base text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup/tenant" className="text-blue-500">
              Register
            </Link>
          </p>
          <p>
            Are you a landlord?{" "}
            <Link to="/login/landlord" className="text-blue-500">
              Login here
            </Link>
          </p>
          <p>
            Are you an admin?{" "}
            <Link to="/login/admin" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenantLogin;
