// Dashboard.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css"; 

const Dashboard = ({ fireData }) => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Forest Fire Monitoring Dashboard</h1>
            </header>
            <main>
                <MapContainer
                    center={[36.7783, -119.4179]}
                    zoom={6}
                    style={{ height: "90vh", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {fireData.map((fire, index) => (
                        <Marker
                            key={fire.UniqueId.S || index}
                            position={[
                                parseFloat(fire.Latitude.N),
                                parseFloat(fire.Longitude.N),
                            ]}
                        >
                            <Popup>
                                <strong>{fire.Name.S}</strong>
                                <br />
                                <em>Location:</em> {fire.Location.S}
                                <br />
                                <em>Acres Burned:</em> {fire.AcresBurned.N}
                                <br />
                                <em>Percent Contained:</em> {fire.PercentContained.N}%
                                <br />
                                <em>Admin Unit:</em> {fire.AdminUnit.S}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </main>
        </div>
    );
};

export default Dashboard;
