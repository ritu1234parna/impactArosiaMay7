import React, { useEffect, useState } from "react";
import axios from "axios";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Impact1 = () => {
    const [impactData, setImpactData] = useState([]);
    const [sites, setSites] = useState([]);
    const [totals, setTotals] = useState({ totalWaterDispensed: 0, totalAmountCollected: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atmResponse = await axios.get(`${API_BASE_URL}/atmLocations`);
                setSites(atmResponse.data);
                console.log("atm loc= ", atmResponse.data);
                const startMonth = 10, startYear = 2018, endMonth = 11, endYear = 2024;
                const impactResponse = await axios.get(
                    `${API_BASE_URL}/impactData1?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`
                );
                console.log("I= ",impactResponse.data.data, impactResponse.data.totals);
                setImpactData(impactResponse.data.data);
                setTotals(impactResponse.data.totals);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ backgroundColor: "#d3e8f2", padding: "2rem", minHeight: "100vh" }}>
            <br></br>
            <h1 style={{ textAlign: "center" }}></h1>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <h3>Total Water Dispensed</h3>
                    <p>{totals.totalWaterDispensed.toFixed(2)} liters</p>
                </div>
                
            </div>

            <div className="map-container" style={{ marginTop: "20px" }}>
                <h2 style={{ textAlign: "center" }}>Arosia Water ATMs Locations</h2>
                <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ width: '100%', height: '500px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    {sites.length > 0 && sites.map((atm, index) => (
                        atm.latitude && atm.longitude ? (
                            <Marker
                                key={index}
                                position={[atm.latitude, atm.longitude]}
                                icon={new L.Icon({
                                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                })}
                            >
                                <Popup>
                                    {atm.name} <br />
                                    Latitude: {atm.latitude} <br />
                                    Longitude: {atm.longitude}
                                </Popup>
                            </Marker>
                        ) : null
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Impact1;
