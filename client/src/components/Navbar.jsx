import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../apiEndpoint";
import Logo from "../assets/logo.png"

function Navbar() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${endpoint}/users/me`, { withCredentials: true })
      .then((res) => {
        console.log("User found:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("User not logged in:", err.response?.status);
        setUser(null);
      });
  }, []);

  return (
    <nav className="w-full flex justify-center px-6 sm:px-8 py-3 bg-white shadow-sm">
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Murandi Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}

export default Navbar;
