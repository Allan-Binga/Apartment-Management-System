import { useState } from "react";
import loginImage from "../../assets/admin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { endpoint } from "../../apiEndpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await fetch(`${endpoint}/auth/login/admin`, {
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

      toast.success("Login successful", {
        className:
          "bg-green-100 text-green-800 font-medium rounded-md p-3 shadow",
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 5000);
    } catch (error) {
      toast.error(error.message || "Something went wrong.", {
        className: "bg-red-100 text-red-800 font-medium rounded-md p-3 shadow",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
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

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          Please login
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">
          Enter your credentials below
        </p>

        {loading && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 sm:gap-6 mt-6 sm:mt-8"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Password */}
          <div className="text-right text-sm text-blue-500 hover:underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>

        {/* Redirect to Register */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup/admin" className="text-blue-500 hover:pointer">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
