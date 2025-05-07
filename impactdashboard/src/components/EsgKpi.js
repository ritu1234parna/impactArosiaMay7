import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
// Register necessary components for Chart.js
ChartJS.register(...registerables);

 

// Chart Data
/*const barData1 = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Clean Water Supplied (L)",
      data: [1200, 1900, 3000, 5000, 2400],
      backgroundColor: "#82ccdd",
    },
  ],
};
*/
const barData2 = {
  labels: ["Kolkata", "Konark","Hardoi", "Durgapur", "Asansol", "Nashik", "Hyderabad", "Aizawl","Agartala", "Digha","Ayodhya"],
  datasets: [
    {
      label: "Kiosks Deployed",
      data: [35, 40, 2,15, 5, 15, 2, 25,26,2,15],
      backgroundColor: "#649cb4",
    },
  ],
};

const pieData = {
  labels: ["Health", "Education", "Environment"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ["#74bc44", "#146493", "#649cb4"],
    },
  ],
};

const donutData = {
  labels: ["Plastic Saved", "Carbon Reduced", "Waterborne Diseases Reduced"],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ["#146493", "#74bc44", "#506884"],
    },
  ],
};

// Dashboard Component
const EsgKpi = () => {
  const [barData1, setBarData1] = useState({
    labels: [],
    datasets: [
      {
        label: "Clean Water Supplied (L)",
        data: [],
        backgroundColor: "#043454",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/monthly-water`;
        const response = await axios.get(url);
        const { labels, dataValues } = response.data;

        // Convert $numberDecimal objects to actual numbers
        const convertedDataValues = dataValues.map(item => parseFloat(item.$numberDecimal));

        setBarData1({
          labels: labels,
          datasets: [
            {
              label: "Clean Water Supplied (L)",
              data: convertedDataValues,
              backgroundColor: "#043454",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    fetchData();
  }, []);

   <Bar data={barData1} />
  const cardStyle = {
    padding: "1rem",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "10px",
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#ffffff", fontWeight: "bold" }}
      >
        Arosia Water Environmental, Social, and Governance (ESG) KPIs
      </Typography>

      <Grid container spacing={3}>
        {/* First Row */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={cardStyle}>
            <Typography variant="h6" align="center" gutterBottom>
              Clean Water Supplied Over Time
            </Typography>
            <Bar data={barData1} options={{ maintainAspectRatio: false }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={cardStyle}>
            <Typography variant="h6" align="center" gutterBottom>
              Impact Distribution
            </Typography>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </Paper>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={cardStyle}>
            <Typography variant="h6" align="center" gutterBottom>
              Kiosks Deployed in Cities
            </Typography>
            <Bar data={barData2} options={{ maintainAspectRatio: false }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={cardStyle}>
            <Typography variant="h6" align="center" gutterBottom>
              Environmental Benefits
            </Typography>
            <Doughnut data={donutData} options={{ maintainAspectRatio: false }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EsgKpi;