import signupImage from "../../assets/signup2.jpg";
import { Link } from "react-router-dom";

function LandlordLogin() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${signupImage})`,
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0"></div>

      {/*Login Card*/}
      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Please login
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Enter your credentials below
        </p>

        <form className="flex flex-col gap-6 mt-8">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-blue-500 hover:underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup/landlord" className="text-blue-500 hover:pointer">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LandlordLogin;
