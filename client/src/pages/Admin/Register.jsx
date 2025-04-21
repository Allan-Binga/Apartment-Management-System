import signupImage from "../../assets/admin.jpg";

function AdminRegister() {
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

        <form className="flex flex-col gap-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-lg transition duration-200 bg-blue-500 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
