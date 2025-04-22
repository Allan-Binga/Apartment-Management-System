import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { endpoint } from "../../apiEndpoint";
import signupImage from "../../assets/admin.jpg";

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${signupImage})`,
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      {/*Registration Card*/}
      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Administrator
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Enter your details below
        </p>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");
            setLoading(true);

            try {
              const res = await fetch(`${endpoint}/auth/register/admin`, {
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
              navigate("/login/admin");
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-6 mt-8"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>
    </div>
  );
}

export default AdminRegister;
