import React, { useEffect, useState } from "react";
import { Authenticator, useTheme, Image, Heading, View } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "./App.css";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "leaflet/dist/leaflet.css";

// Configure Amplify
Amplify.configure(awsconfig);

// Fix Leaflet marker icons
const fireIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = fireIcon;

// Custom Authenticator Components
const components = {
    Header() {
        const { tokens } = useTheme();
        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image alt="Logo" src="/img/favicon.png" className="logo" />
            </View>
        );
    },
    SignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    level={3}
                    style={{
                        textAlign: 'center',
                        padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`
                    }}
                >
                    Sign into your account
                </Heading>
            );
        },
    },
    SignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    Create a new account
                </Heading>
            );
        }
    }
};

function App() {
    const [fires, setFires] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [fireTrends, setFireTrends] = useState(null); // State for fire trends
    const [dashboardData, setDashboardData] = useState(null); // State for dashboard data

    // Fetch fire data
    const fetchFireData = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-info?latitude=${lat}&longitude=${lng}`
            );
            setFires(response.data.fires || []);
        } catch (error) {
            console.error("Error fetching the fire data:", error);
        }
    };

    // Fetch fire trends data
    const fetchFireTrends = async () => {
        try {
            const response = await axios.get(
                `https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-trends?year=2024`
            );
            setFireTrends(response.data);
        } catch (error) {
            console.error("Error fetching the fire trends:", error);
        }
    };

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(
                `https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/dashboard-data`
            );
            setDashboardData(response.data);
        } catch (error) {
            console.error("Error fetching the dashboard data:", error);
        }
    };

    // Get user location and fetch data
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLatitude = position.coords.latitude;
                    const userLongitude = position.coords.longitude;
                    setLatitude(userLatitude);
                    setLongitude(userLongitude);
                    fetchFireData(userLatitude, userLongitude);
                },
                () => {
                    const defaultLatitude = 33.917991;
                    const defaultLongitude = -116.91162;
                    setLatitude(defaultLatitude);
                    setLongitude(defaultLongitude);
                    fetchFireData(defaultLatitude, defaultLongitude);
                }
            );
        }

        fetchFireTrends(); // Fetch fire trends data
        fetchDashboardData(); // Fetch dashboard data
    }, []);

    if (latitude === null || longitude === null) {
        return <div>Loading your location...</div>;
    }

    return (
        <div className="auth-container">
            <Authenticator components={components}>
                {({ signOut, user }) => (
                    <div className="App">
                        <header className="App-header">
                            <h1>Welcome, {user.username}</h1>
                            <button onClick={signOut}>Sign Out</button>
                        </header>
                        <div className="app-content">
                            <div className="sidebar">
                                <button>Home</button>
                                <button>Fire History</button>
                                {dashboardData && (
                                    <div className="dashboard-box">
                                        <h3>Dashboard Data</h3>
                                        <p><strong>Total Fires:</strong> {dashboardData.total_fire_count}</p>
                                        <p><strong>Total Acres Burned:</strong> {dashboardData.total_acres_burned.toFixed(2)}</p>
                                        <p><strong>Active Fires:</strong> {dashboardData.active_fires}</p>
                                        <p><strong>Fire Types:</strong></p>
                                        <ul>
                                            {Object.entries(dashboardData.fire_types).map(([type, count]) => (
                                                <li key={type}>{type}: {count}</li>
                                            ))}
                                        </ul>
                                        <p><strong>Fire Regions:</strong></p>
                                        <ul>
                                            {Object.entries(dashboardData.fire_regions).map(([region, count]) => (
                                                <li key={region}>{region}: {count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="map-container">
                                <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {fires.map((fire, index) => (
                                        <Marker
                                            key={index}
                                            position={[
                                                parseFloat(fire.incident.Latitude.N),
                                                parseFloat(fire.incident.Longitude.N),
                                            ]}
                                            icon={fireIcon}
                                        >
                                            <Popup>
                                                <h3>{fire.incident.Name.S}</h3>
                                                <p><strong>Location:</strong> {fire.incident.Location.S}</p>
                                                <p><strong>Acres Burned:</strong> {fire.incident.AcresBurned.N}</p>
                                                <p><strong>Started:</strong> {fire.incident.Started.S}</p>
                                                <p><strong>Contained:</strong> {fire.incident.PercentContained.N}%</p>
                                                <p><strong>Admin Unit:</strong> {fire.incident.AdminUnit.S || "N/A"}</p>
                                            </Popup>
                                        </Marker>
                                    ))}
                                    <CircleMarker
                                        center={[latitude, longitude]}
                                        radius={8}
                                        color="red"
                                        fillColor="red"
                                        fillOpacity={1}
                                    >
                                        <Popup>
                                            <strong>Your Location</strong><br />
                                            Latitude: {latitude}<br />
                                            Longitude: {longitude}
                                        </Popup>
                                    </CircleMarker>
                                </MapContainer>
                            </div>
                        </div>
                        {fireTrends && (
                            <div className="fire-trends">
                                <h2>Fire Trends - {fireTrends.year}</h2>
                                <p><strong>Total Fires:</strong> {fireTrends.fire_count}</p>
                                <p><strong>Total Acres Burned:</strong> {fireTrends.total_acres_burned.toFixed(2)}</p>
                            </div>
                        )}
                    </div>
                )}
            </Authenticator>
        </div>
    );
}

export default App;
