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
        <Route path="/account-verification" element={<Verify/>}/>
        <Route path="/maintenance-requests" element={<Maintenance/>}/>
        <Route path="/payments" element={<Payments/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
