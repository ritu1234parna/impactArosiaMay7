import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip
} from "recharts";
import { motion } from "framer-motion";
import "./assets/WomenEmpowermentChart.css";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
const COLORS = ["#ff7f7f", "#ffd700", "#6495ed", "#8a2be2"];

const WomenEmpowermentChart = () => {
  const [data, setData] = useState([]);
  const [wei, setWei] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const url = `${API_BASE_URL}/monthly-water`;
    setLoading(true); // Start loading
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const formattedData = result.dataValues.map((value, index) => {
          const water = parseFloat(value["$numberDecimal"]);
          return {
            month: result.labels[index],
            waterDelivered: water,
            healthImprovement: water * 0.2,
            economicParticipation: water * 0.15,
            educationImprovement: water * 0.1,
            socialDecision: water * 0.05,
          };
        });
        setData(formattedData);
        calculateWEI(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); // Stop loading
  }, []);

  const calculateWEI = (data) => {
    const totalWater = data.reduce((sum, entry) => sum + entry.waterDelivered, 0);
    const timeSaved = totalWater * 0.5;
    const healthImprovement = totalWater * 0.2;
    const economicParticipation = totalWater * 0.15;
    const educationImprovement = totalWater * 0.1;
    const socialDecision = totalWater * 0.05;

    const weiValue =
      timeSaved * 0.4 +
      healthImprovement * 0.2 +
      economicParticipation * 0.15 +
      educationImprovement * 0.15 +
      socialDecision * 0.1;

    setWei(weiValue.toFixed(2));
  };

  return (
    <div className="chart-wrapper">
      <div className="calculation-details">
        <h3>Women Empowerment Impact</h3>
        <p>
          Calculating women empowerment based on clean water delivered to the doorstep involves both quantitative and qualitative indicators. The goal is to measure how improved access to water reduces the burden on women and enhances their economic, social, and health opportunities.
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Loading data...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="chart-content">
            <h2 className="chart-title">Women Empowerment Impact</h2>
            {wei && <p className="chart-wei">WEI Score: {wei}</p>}
            <div className="chart-container">
              <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="waterDelivered" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Health Improvement</h3>
              <LineChart width={360} height={250} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="healthImprovement" stroke="#ff7f7f" />
              </LineChart>
            </div>

            <div className="chart-card">
              <h3>Economic Participation</h3>
              <PieChart width={360} height={250}>
                <Pie data={data} dataKey="economicParticipation" cx="50%" cy="50%" outerRadius={100} fill="#ffd700">
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="chart-card">
              <h3>Education Improvement</h3>
              <AreaChart width={360} height={250} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="educationImprovement" fill="#6495ed" stroke="#004b6b" />
              </AreaChart>
            </div>

            <div className="chart-card">
              <h3>Social Decision Making</h3>
              <RadarChart outerRadius={90} width={400} height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="month" />
                <PolarRadiusAxis />
                <Radar name="Social Impact" dataKey="socialDecision" stroke="#8a2be2" fill="#8a2be2" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WomenEmpowermentChart;
