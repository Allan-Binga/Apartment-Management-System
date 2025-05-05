import ChangePasswordImage from "../../assets/signup.jpg";
import { endpoint } from "../../apiEndpoint";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

function PasswordChange() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  //Run Token Verification
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.get(
            `${endpoint}/verify/password/token?token=${token}`
          );
          setMessage(response.data.message);
          setStatus("success");
        } catch (error) {
          setMessage(
            error.response?.data?.message || "Token verification failed."
          );
          setStatus("error");
          setShowResend(true);
        }
      };
      verifyToken();
    }
  }, [token]);

  //Resend Password Reset Email
  const resendPasswordResetEmail = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      setStatus("error");
      return;
    }

    try {
      const response = await axios.post(
        `${endpoint}/verify/resend/password/reset`,
        { email }
      );
      setMessage(response.data.message);
      setStatus("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend email.");
      setStatus("error");
    }
  };

  //Password Reset Submission
  const resetPasswordToken = async () => {
    try {
      const response = await axios.put(
        `${endpoint}/password/reset/password/token`,
        { token, newPassword, confirmPassword }
      );
      setMessage(response.data.message);
      setStatus("success");
      setTimeout(() => {
        navigate("/login/tenant");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setStatus("error");
      return;
    }

    resetPasswordToken();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 sm:px-8 lg:px-10"
      style={{ backgroundImage: `url(${ChangePasswordImage})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="light"
      />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mt-4 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Reset Password
          </h2>

          {/* Status Message */}
          {message && (
            <div
              className={`mb-4 p-3 rounded flex items-center gap-2 ${
                status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status === "success" ? <CheckCircle /> : <AlertCircle />}
              {message}
            </div>
          )}

          {/* Conditional Rendering */}
          {showResend ? (
            // Resend Email Component
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter your email to request a new password reset link
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <button
                onClick={resendPasswordResetEmail}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Resend Email
              </button>
            </div>
          ) : (
            // Reset Password Form
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
