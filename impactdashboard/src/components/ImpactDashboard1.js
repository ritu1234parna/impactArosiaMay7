import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaTint, FaRecycle, FaSun, FaUsers, FaLeaf, FaGlobe, FaHeartbeat, FaBriefcase, FaLightbulb, FaMoneyBill } from "react-icons/fa";
import logo from "./assets/arosia logo.png";
import "./assets/ImpactDashboard1.css";
const COLORS = ["#007bff", "#28a745", "#ffc107", "#ff5733"];
const impactData = [
    { month: "Jan", waterSupplied: 40000, plasticSaved: 20000, co2Reduced: 8 },
    { month: "Feb", waterSupplied: 50000, plasticSaved: 25000, co2Reduced: 10 },
    { month: "Mar", waterSupplied: 60000, plasticSaved: 30000, co2Reduced: 12 },
    { month: "Apr", waterSupplied: 75000, plasticSaved: 35000, co2Reduced: 15 },
  ];

  
export default function ImpactDashboard() {
    const [dispensedWater, setDispensedWater] = useState(500000); // Initial value

  useEffect(() => {
    document.title = "Arosia Impact Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login"; 
  };

  return (
    <div>
    <div className="dashboard-container">
      
      {/* Top Bar with Logo & Logout Button */}
      <div className="dashboard-header">
        <div className="logo-container">
          <img src={logo} alt="Arosia Water Logo" className="logo" />
          <h1 className="dashboard-title" > Impact Dashboard</h1>
        </div>
        
    
      </div>
    
     
    
      {/* Impact Cards Section */}
      <div className="impact-cards-container">
        <ImpactCard icon={<FaTint />} title="Water Supplied" value="500K+ L/Month" />
        <ImpactCard icon={<FaRecycle />} title="Plastic Saved" value="1.2M+ Bottles" />
        <ImpactCard icon={<FaLeaf />} title="CO₂ Reduced" value="80 Metric Tons/Yr" />
        <ImpactCard icon={<FaSun />} title="Solar Kiosks" value="40% of Network" />
        <ImpactCard icon={<FaUsers />} title="Women Empowered" value="60% Operators" />
    </div>
    <div className="impact-cards-container">
        <ImpactCard icon={<FaGlobe />} title="Energy Saved" value="800 kWh/Month" />
        <ImpactCard icon={<FaHeartbeat />} title="Health Improvement" value="30% Disease Reduction" />
        <ImpactCard icon={<FaBriefcase />} title="Jobs Created" value="150+ Local Jobs" />
        <ImpactCard icon={<FaLightbulb />} title="Renewable Energy" value="75% Solar-Powered" />
        <ImpactCard icon={<FaMoneyBill />} title="Cost Savings" value="50% vs Bottled Water" />
      </div>

    </div>
  
    </div>
  );
}

function ImpactCard({ icon, title, value }) {
  return (
    <div className="impact-card">
      <div className="impact-icon">{icon}</div>
      <h3 className="impact-title">{title}</h3>
      <p className="impact-value">{value}</p>
    </div>
  );
}


