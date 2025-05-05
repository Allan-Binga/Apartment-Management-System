import AdminSidebar from "./Sidebar";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import {
  Mail,
  Phone,
  Calendar,
  Home,
  User,
  Users as UsersIcon,
  Shield,
} from "lucide-react";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/all-users`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const UserCard = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      <div className="flex items-center mb-2 space-x-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        className="z-10"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 md:pl-80">
          {loading ? (
            <Spinner />
          ) : (
            <div className="space-y-12">
              {/* Tenants */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <UsersIcon className="w-5 h-5" />
                  <h2 className="text-2xl font-semibold">Tenants</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {users.tenants?.map((tenant) => (
                    <UserCard
                      key={tenant.id}
                      title={`${tenant.firstname} ${tenant.lastname}`}
                      icon={<User className="w-4 h-4 text-blue-500" />}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {tenant.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {tenant.phonenumber}
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-500" />
                        Apt: {tenant.apartmentnumber}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(tenant.leasestartdate)} –{" "}
                        {formatDate(tenant.leaseenddate)}
                      </div>
                    </UserCard>
                  ))}
                </div>
              </section>

              {/* Landlords */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <Shield className="w-5 h-5" />
                  <h2 className="text-2xl font-semibold">Landlords</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {users.landlords?.map((landlord) => (
                    <UserCard
                      key={landlord.id}
                      title={`${landlord.firstname} ${landlord.lastname}`}
                      icon={<User className="w-4 h-4 text-green-600" />}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {landlord.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {landlord.phonenumber}
                      </div>
                    </UserCard>
                  ))}
                </div>
              </section>

              {/* Admins */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h2 className="text-2xl font-semibold">Admins</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {users.admins?.map((admin) => (
                    <UserCard
                      key={admin.id}
                      title="Admin"
                      icon={<Shield className="w-4 h-4 text-purple-500" />}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {admin.email}
                      </div>
                    </UserCard>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default Users;
