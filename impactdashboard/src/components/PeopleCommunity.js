import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./assets/PeopleCommunity.css";

const impactData = [
  { name: "Health Benefits", value: 40 },
  { name: "Education Improvement", value: 25 },
  { name: "Women Empowerment", value: 20 },
  { name: "Employment", value: 15 },
];

const engagementData = [
  { month: "Jan", people: 400 },
  { month: "Feb", people: 500 },
  { month: "Mar", people: 650 },
  { month: "Apr", people: 700 },
  { month: "May", people: 850 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PeopleCommunity = () => {
  return (
    <div className="people-community-container">
      <h2 className="community-title">People & Community Performance</h2>
      
      <div className="charts-container">
        {/* Pie Chart for Community Impact */}
        <div className="chart-card">
          <h3>Community Impact</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={impactData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Engagement Over Months */}
        <div className="chart-card">
          <h3>Community Engagement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={engagementData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="people" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PeopleCommunity;
