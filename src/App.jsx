import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddFaq from "./pages/AddFaq";
import ProtectedRoute from "./components/ProtectedRoute";
import EditFaq from "./pages/editfaq";
import Navbar from "./pages/Navbar";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/notfound";

function App() {
  const location = useLocation();

  // Define paths where you want to show the Navbar
  const showNavbarPaths = ["/home", "/add-faq", "/edit-faq"];

  // Check if current path starts with any of the allowed paths
  const shouldShowNavbar = showNavbarPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/edit-faq/:id"
          element={
            <ProtectedRoute>
              <EditFaq />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-faq"
          element={
            <ProtectedRoute>
              <AddFaq />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
