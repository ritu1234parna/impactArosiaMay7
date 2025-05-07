import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assets/styles.css";


const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Report = () => {

  const [masterSites, setMasterSites] = useState([]);
  const [masterSiteId, setMasterSiteId] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [msg,setMsg]=useState("");
  const [filePath,setFilePath]=useState("");

  // Fetch MasterSites from API
  useEffect(() => {
    const fetchMasterSites = async () => {
      try {
        const url = `${API_BASE_URL}/mastersitesnameid`;
        console.log("url= ",url);
        const response = await axios.get(url);
      
        console.log("response= ",response.data);
        setMasterSites(response.data);
      } catch (error) {
        console.error("Error fetching MasterSites:", error);
      }
    };

    fetchMasterSites();
  }, []);

  const handleDownload = async () => {
    console.log("received data= ", masterSiteId,startMonth,startYear,endMonth,endYear);
    if (!masterSiteId || !startMonth || !startYear || !endMonth || !endYear) {
      alert("Please fill in all fields!");
      return;
    }

    try {
        console.log("entered try");
        const urlGenerate=`${API_BASE_URL}/generateExcel?masterSiteId=${masterSiteId}&startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`;
        console.log("urlGenerate= ",urlGenerate);
        const response = await axios.get(urlGenerate,
       {
          masterSiteId,
          startDate: `${startYear}-${startMonth}`,
          endDate: `${endYear}-${endMonth}`,
        },
        {
          responseType: "blob", // To handle binary data
        
        });
      console.log("urlGenerate= ", urlGenerate);
      // Open in new tab to trigger download
        window.open(urlGenerate, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading the file.");
    }
  };

  return (

    <div>
      <section className="hero">
      <div className="hero-content">
       
      </div>
    </section>
    <div className="dashboard-header">
      
        <br></br>
        
      <p>Select date range to download Report</p>
      <div style={{ marginBottom: "5px" }}>
        <label>MasterSite: </label>
        <select
          value={masterSiteId}
          onChange={(e) => setMasterSiteId(e.target.value)}
        >
          <option value="">-- Select a MasterSite --</option>
          {masterSites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Start Month/Year</label>
        <br></br>
        <input
          type="number"
          placeholder="MM"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          min="1"
          max="12"
          style={{ width: "50px", marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="YYYY"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          style={{ width: "70px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>End Month/Year</label>
        <br></br>
        <input
          type="number"
          placeholder="MM"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          min="1"
          max="12"
          
        />
        <input
          type="number"
          placeholder="YYYY"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          style={{ width: "70px" }}
        />
      </div>
      <br></br><br></br>
      <br></br>
      <button className="start-btn" onClick={handleDownload}>Download</button>
      <text>{msg}</text>
      <text> {filePath}</text>
    </div>
  </div>
  );
};
export default Report;