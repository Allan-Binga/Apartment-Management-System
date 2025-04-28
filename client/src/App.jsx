import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 1800 }} />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/listings" element={<Listings/>}/>
        <Route path="/payment/success" element={<SuccessPage />} />
        <Route path="/payment/cancelled" element={<CancelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
