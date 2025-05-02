import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Tenant/Home";
import TenantRegister from "./pages/Tenant/Register";
import TenantLogin from "./pages/Tenant/Login";
import LandlordRegister from "./pages/Landlord/Register";
import LandlordLogin from "./pages/Landlord/Login";
import AdminRegister from "./pages/Admin/Register";
import AdminLogin from "./pages/Admin/Login";
import Verify from "./pages/accountVerification/Verify";
import Payments from "./pages/Payments/Payments";
import Maintenance from "./pages/Maintenance/Maintenance";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Notifications from "./pages/Notifications/Notifications";
import LandlordHome from "./pages/Landlord/Home";
import SuccessPage from "./pages/Success/Success";
import CancelPage from "./pages/Cancel/Cancel";
import Listings from "./pages/Landlord/Listings";
import LandlordPayments from "./pages/Landlord/Payments";
import Reports from "./pages/Landlord/Reports";
import Dashboard from "./pages/Landlord/Dashboard";
import Tenants from "./pages/Landlord/Tenants";
import LandingPage from "./pages/Landing/Landing";
import AdminDashboard from "./pages/Admin/Dashboard";


function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 1800 }} />
      <Routes>
        {/* Redirect from the root path to /login/tenant */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/landing" element={<LandingPage/>}/>
        <Route path="/signup/tenant" element={<TenantRegister />} />
        <Route path="/login/tenant" element={<TenantLogin />} />
        <Route path="/signup/landlord" element={<LandlordRegister />} />
        <Route path="/login/landlord" element={<LandlordLogin />} />
        <Route path="/signup/admin" element={<AdminRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/account-verification" element={<Verify />} />
        <Route path="/maintenance-requests" element={<Maintenance />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/home/landlord" element={<LandlordHome />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/payment/success" element={<SuccessPage />} />
        <Route path="/payment/cancelled" element={<CancelPage />} />
        <Route path="/landlord/payments" element={<LandlordPayments />} />
        <Route path="/landlord/reports" element={<Reports/>} />
        <Route path="/landlord/dashboard" element={<Dashboard/>}/>
        <Route path="/tenants" element={<Tenants/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
