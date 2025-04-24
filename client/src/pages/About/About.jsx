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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1 bg-gray-50">
        <SideBar />

        <main className="flex-1 ml-[calc(18rem+2rem)] p-8 bg-gray-50">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              About Murandi
            </h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto my-3 rounded-full" />
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our Apartment Management System simplifies the daily operations of
              residential communities. We are committed to providing efficient
              tools for administrators, owners, and tenants to manage everything
              from rent payments to maintenance requests.
            </p>
          </div>

          {/* First Feature Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Feature
              icon={<Building2 className="text-blue-600 mx-auto" size={40} />}
              title="Modern Living"
              desc="Designed for seamless community living in the digital age."
            />
            <Feature
              icon={<Users className="text-green-600 mx-auto" size={40} />}
              title="Community Focus"
              desc="Transparent communication between tenants and management."
            />
            <Feature
              icon={
                <ShieldCheck className="text-purple-600 mx-auto" size={40} />
              }
              title="Security First"
              desc="Enterprise-level encryption for your safety."
            />
            <Feature
              icon={<Wrench className="text-yellow-600 mx-auto" size={40} />}
              title="Maintenance Made Easy"
              desc="Track and resolve issues in real time."
            />
          </div>

          {/* Screenshot-inspired Feature Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<Home className="text-blue-600 mx-auto" size={40} />}
              title="Verified Properties"
              desc="Every property is thoroughly verified for quality and security."
            />
            <Feature
              icon={<Globe className="text-blue-600 mx-auto" size={40} />}
              title="User-Friendly Platform"
              desc="Intuitive navigation and seamless property management."
            />
            <Feature
              icon={<Headphones className="text-blue-600 mx-auto" size={40} />}
              title="24/7 Support"
              desc="Round-the-clock assistance for all your queries."
            />
            <Feature
              icon={<List className="text-blue-600 mx-auto" size={40} />}
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
  <div className="bg-white p-6 rounded-2xl shadow-md text-center">
    <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto">{icon}</div>
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="text-gray-500 mt-2">{desc}</p>
  </div>
);

export default About;
