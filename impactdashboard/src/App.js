import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"; // Added Navigate
import ImpactDashboard1 from "./components/ImpactDashboard1";
import "./components/assets/styles.css";
import logo from "./components/assets/arosia logo.png";
import Report from "./components/Reports";
import Map from "./components/Map";
import EsgKpi from "./components/EsgKpi";
import Overview from "./components/Overview";
import Impact1 from "./components/Impact1";
import Sustainability from "./components/Sustainability";
import PeopleCommunity from "./components/PeopleCommunity";
import WomenEmpowermentChart from "./components/WomenEmpowermentChart";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>IMPACT DASHBOARD</h2>
      <ul>
        <li><Link to="/overview">Overview</Link></li>
        <li><Link to="/impact">Impact</Link></li>
        <li><Link to="/impact1">Operations</Link></li>
        <li><Link to="/people">People & Performance</Link></li>
        <li><Link to="/sustainability">Sustainability</Link></li>
      </ul>
    </div>
  );
};

// Footer Component (Placed Outside Sidebar)
function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Arosia Water</p> 
      <p>Website: <a color="white" href="https://www.arosia.in" target="_blank" rel="noopener noreferrer">www.arosia.in</a></p>
      <p>Contact us: +91 869770 2088</p>
    </footer>
  );
}

// Navbar Component with Logout
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <img src={logo} alt="Arosia Logo" className="logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/report">Report</Link>
        <Link to="/social">Social</Link>
        <Link to="/esg">Environmental</Link>
        <Link to="/map">Map</Link>
        {user ? (
          <button onClick={logout} className="logout-btn">Logout</button>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="main-content">
      <h1>DASHBOARD</h1>
      <p>Welcome, <strong>Rituparna Das</strong> of Hydrotec Solutions!</p>
      <button className="start-btn">GET STARTED</button>
      <h2>IMPORT DATA</h2>
      <a href="#">Common Impact Data Standard (Basic Tier) - JSON-LD</a>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Navbar />  {/* Navbar is now outside content */}
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
            <Route path="/impact" element={<ProtectedRoute><ImpactDashboard1 /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/esg" element={<ProtectedRoute><EsgKpi /></ProtectedRoute>} />
            <Route path="/impact1" element={<ProtectedRoute><Impact1 /></ProtectedRoute>} />
            <Route path="/sustainability" element={<ProtectedRoute><Sustainability /></ProtectedRoute>} />
            <Route path="/people" element={<ProtectedRoute><PeopleCommunity /></ProtectedRoute>} />
            <Route path="/social" element={<ProtectedRoute><WomenEmpowermentChart /></ProtectedRoute>} />
            
            {/* Login should NOT be protected */}
            <Route path="/login" element={<Login />} />

            {/* Redirect Logout: Clears session and redirects to login */}
            <Route path="/logout" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <Footer /> {/* Footer is placed outside content */}
    </Router>
  );
};

export default App;
