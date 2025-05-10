import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobsPage from "./pages/Jobs";
import Login from "./pages/Login";
import MentorProfile from "./pages/MentorProfile";
import MentorPage from "./pages/Mentors";
import ProfilePage from "./pages/Profile";
import RegisterMentor from "./pages/RegisterMentor";
import Signup from "./pages/Signup";
import ThreadDetails from "./pages/ThreadDetail";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/login", "/signup", "/forgot-password", "/reset-password"];

  return (
    <div className="flex flex-col ">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/thread/:id" element={<ThreadDetails />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/mentors/:mentorId" element={<MentorProfile />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-mentor" element={<RegisterMentor />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="1043577660389-8vmm833o6dtibtsip5lull1droi8p3ij.apps.googleusercontent.com">

        <AppWrapper />
      </GoogleOAuthProvider>
    </Router>
  );
}
