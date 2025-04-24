import { Building2, Users, ShieldCheck, Wrench } from "lucide-react";
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Murandi</h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Our Apartment Management System simplifies the daily operations of residential
            communities. We are committed to providing efficient tools for administrators, owners,
            and tenants to manage everything from rent payments to maintenance requests.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <Building2 className="mx-auto text-blue-600" size={40} />
              <h3 className="text-xl font-semibold mt-4">Modern Living</h3>
              <p className="text-gray-500 mt-2">
                Designed for seamless community living in the digital age.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <Users className="mx-auto text-green-600" size={40} />
              <h3 className="text-xl font-semibold mt-4">Community Focus</h3>
              <p className="text-gray-500 mt-2">
                Fosters transparent communication between tenants and management.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <ShieldCheck className="mx-auto text-purple-600" size={40} />
              <h3 className="text-xl font-semibold mt-4">Security First</h3>
              <p className="text-gray-500 mt-2">
                Your data and community records are safe with enterprise-level encryption.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <Wrench className="mx-auto text-yellow-600" size={40} />
              <h3 className="text-xl font-semibold mt-4">Maintenance Made Easy</h3>
              <p className="text-gray-500 mt-2">
                Easily track and resolve apartment issues with real-time updates.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default About;
