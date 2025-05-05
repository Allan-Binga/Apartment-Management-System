import ResetPasswordImage from "../../assets/signup.jpg";
import { endpoint } from "../../apiEndpoint";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Spinner from "../../components/Spinner";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //API CALL that resets passwords
  const resetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${endpoint}/password/send/email`, {
        email,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.info(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(); // Call resetPassword when form is submitted
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 sm:px-8 lg:px-10"
      style={{ backgroundImage: `url(${ResetPasswordImage})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="light"
      />
      {loading && <Spinner />}
      {/* Blur overlay */}
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-0"></div>

      {/* Form container with higher z-index */}
      <div className="flex-grow flex items-center justify-center z-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl border">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Reset Your Password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer"
            >
              Send password reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
