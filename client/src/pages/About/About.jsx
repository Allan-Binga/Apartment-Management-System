import { useState } from "react";
import {
  Building2,
  Users,
  ShieldCheck,
  Wrench,
  Home,
  Globe,
  Headphones,
  List,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function About() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1">
        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 transition-all duration-300 ${
            showSidebar
              ? "lg:ml-[calc(18rem)] ml-0"
              : "lg:ml-[calc(18rem)] ml-0"
          }`}
        >
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
              About Murandi
            </h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto my-2 sm:my-3 rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-[90%] sm:max-w-2xl mx-auto">
              Our Apartment Management System simplifies the daily operations of
              residential communities. We are committed to providing efficient
              tools for administrators, owners, and tenants to manage everything
              from rent payments to maintenance requests.
            </p>
          </div>

          {/* First Feature Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <Feature
              icon={<Building2 className="text-blue-600 mx-auto" size={32} />}
              title="Modern Living"
              desc="Designed for seamless community living in the digital age."
            />
            <Feature
              icon={<Users className="text-green-600 mx-auto" size={32} />}
              title="Community Focus"
              desc="Transparent communication between tenants and management."
            />
            <Feature
              icon={
                <ShieldCheck className="text-purple-600 mx-auto" size={32} />
              }
              title="Security First"
              desc="Enterprise-level encryption for your safety."
            />
            <Feature
              icon={<Wrench className="text-yellow-600 mx-auto" size={32} />}
              title="Maintenance Made Easy"
              desc="Track and resolve issues in real time."
            />
          </div>

          {/* Second Feature Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Feature
              icon={<Home className="text-blue-600 mx-auto" size={32} />}
              title="Verified Properties"
              desc="Every property is thoroughly verified for quality and security."
            />
            <Feature
              icon={<Globe className="text-blue-600 mx-auto" size={32} />}
              title="User-Friendly Platform"
              desc="Intuitive navigation and seamless property management."
            />
            <Feature
              icon={<Headphones className="text-blue-600 mx-auto" size={32} />}
              title="24/7 Support"
              desc="Round-the-clock assistance for all your queries."
            />
            <Feature
              icon={<List className="text-blue-600 mx-auto" size={32} />}
              title="Comprehensive Listings"
              desc="Wide range of properties to match every need and budget."
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

// Feature Card Component
const Feature = ({ icon, title, desc }) => (
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center">
    <div className="bg-blue-50 p-2 sm:p-3 rounded-full w-fit mx-auto">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-500 mt-2">{desc}</p>
  </div>
);

export default About;
