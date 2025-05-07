import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer";
import "leaflet/dist/leaflet.css";

const WaterUsageHeatmap = () => {
    const heatmapData = [
        { lat: 28.7041, lng: 77.1025, intensity: 0.8 }, // Delhi
        { lat: 19.0760, lng: 72.8777, intensity: 0.9 }, // Mumbai
        { lat: 13.0827, lng: 80.2707, intensity: 0.7 }, // Chennai
        { lat: 22.5726, lng: 88.3639, intensity: 0.6 }, // Kolkata
        { lat: 12.9716, lng: 77.5946, intensity: 0.85 }, // Bangalore
    ];

    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ width: "100%", height: "500px" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <HeatmapLayer
                points={heatmapData}
                longitudeExtractor={(m) => m.lng}
                latitudeExtractor={(m) => m.lat}
                intensityExtractor={(m) => m.intensity}
                radius={20}
                blur={15}
                max={1.0}
            />
        </MapContainer>
    );
};

export default WaterUsageHeatmap;
