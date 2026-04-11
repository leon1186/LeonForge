import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import PhotoBootPage from "./pages/PhotoBootPage";
import ScrollToTop from "./shared/ScrollToTop";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/DashboardPage";
import InquiryDetailPage from "./pages/InquiryDetailPage";
import ProtectedRoute from "./shared/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import EventDetailImagesPage from "./pages/EventdetailImagesPage";

import RegisterPage from "./pages/RegisterPage";
import EnterInquiryPage from "./pages/EnterInquiryPage";

function App() {
  const location = useLocation();
  const hideWhatsappButton =
    location.pathname === "/dashboard" ||
    location.pathname === "/panel" ||
    location.pathname.startsWith("/dashboard/inquiries/");
  const hideFooter =
    location.pathname === "/dashboard" ||
    location.pathname === "/panel" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/dashboard/inquiries/");

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photo-booth" element={<PhotoBootPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:title" element={<EventDetailImagesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/panel" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/inquiries/new"
          element={
            <ProtectedRoute>
              <EnterInquiryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/inquiries/:id"
          element={<InquiryDetailPage />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      {!hideWhatsappButton && <WhatsAppButton />}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
