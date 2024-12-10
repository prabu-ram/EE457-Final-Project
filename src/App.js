
// import { Authenticator, useTheme, Image, Heading, View } from '@aws-amplify/ui-react';
// import "@aws-amplify/ui-react/styles.css";
// import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
// import axios from "axios";
// import L from "leaflet";
// import "./App.css";
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports'; 
// import "leaflet/dist/leaflet.css";
// import React, { useEffect, useState } from "react";


// // Fix Leaflet marker icons (Leaflet requires images for markers)
// import "leaflet/dist/leaflet.css";

// // Default fire marker (reduced size)
// const fireIcon = L.icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   iconSize: [20, 30], // Reduced size
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// L.Marker.prototype.options.icon = fireIcon;

// Amplify.configure(awsconfig);

// // Custom Authenticator Components
// const components = {
//     Header() {
//         const { tokens } = useTheme();
//         return (
//             <View textAlign="center" padding={tokens.space.large}>
//                 <Image alt="Logo" src="/img/favicon.png" className="logo" />
//             </View>
//         );
//     },
//     SignIn: {
//         Header() {
//             const { tokens } = useTheme();
//             return (
//                 <Heading
//                     level={3}
//                     style={{
//                         textAlign: 'center',
//                         padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`
//                     }}
//                 >
//                     Sign into your account
//                 </Heading>
//             );
//         },
//     },
//     SignUp: {
//         Header() {
//             const { tokens } = useTheme();
//             return (
//                 <Heading
//                     padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
//                     level={3}
//                 >
//                     Create a new account
//                 </Heading>
//             );
//         }
//     }
// };

// function App() {
//     const [fires, setFires] = useState([]);
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);

//     // Fetch fire data based on user's latitude and longitude
//     const fetchFireData = async (lat, lng) => {
//         try {
//             const response = await axios.get(
//                 `https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-info?latitude=${lat}&longitude=${lng}`
//             );
//             setFires(response.data.fires || []);
//         } catch (error) {
//             console.error("Error fetching the fire data:", error);
//         }
//     };

//     // Get user's location
//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const userLatitude = position.coords.latitude;
//                     const userLongitude = position.coords.longitude;
//                     setLatitude(userLatitude);
//                     setLongitude(userLongitude);
//                     fetchFireData(userLatitude, userLongitude);
//                 },
//                 (error) => {
//                     console.error("Geolocation error:", error);
//                     const defaultLatitude = 33.917991;
//                     const defaultLongitude = -116.91162;
//                     setLatitude(defaultLatitude);
//                     setLongitude(defaultLongitude);
//                     fetchFireData(defaultLatitude, defaultLongitude);
//                 }
//             );
//         } else {
//             console.log("Geolocation is not supported by this browser.");
//             const defaultLatitude = 33.917991;
//             const defaultLongitude = -116.91162;
//             setLatitude(defaultLatitude);
//             setLongitude(defaultLongitude);
//             fetchFireData(defaultLatitude, defaultLongitude);
//         }
//     }, []);

//     if (latitude === null || longitude === null) {
//         return <div>Loading your location...</div>;
//     }

//     return (
//         <div className="auth-container">
//             <Authenticator components={components}>
//                 {({ signOut, user }) => (
//                     <div className="App">
//                         <header className="App-header">
//                             <h1>Welcome, {user.username}</h1>
//                             <button onClick={signOut}>Sign Out</button>
//                         </header>
//                         <div className="app-content">
//                             <div className="sidebar">
                                
//                             </div>
//                             <div id="map" className="map-container">
//                                 <MapContainer
//                                     center={[latitude, longitude]}
//                                     zoom={10}
//                                     style={{ height: "100%", width: "100%" }}
//                                 >
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                     />
//                                     {fires.map((fire, index) => (
//                                         <Marker
//                                             key={index}
//                                             position={[
//                                                 parseFloat(fire.incident.Latitude.N),
//                                                 parseFloat(fire.incident.Longitude.N),
//                                             ]}
//                                             icon={fireIcon}
//                                         >
//                                             <Popup>
//                                                 <h3>{fire.incident.Name.S}</h3>
//                                                 <p><strong>Location:</strong> {fire.incident.Location.S}</p>
//                                                 <p><strong>Acres Burned:</strong> {fire.incident.AcresBurned.N}</p>
//                                                 <p><strong>Started:</strong> {fire.incident.Started.S}</p>
//                                                 <p><strong>Contained:</strong> {fire.incident.PercentContained.N}%</p>
//                                                 <p><strong>Admin Unit:</strong> {fire.incident.AdminUnit.S || "N/A"}</p>
//                                             </Popup>
//                                         </Marker>
//                                     ))}
//                                     <CircleMarker
//                                         center={[latitude, longitude]}
//                                         radius={8}
//                                         color="red"
//                                         fillColor="red"
//                                         fillOpacity={1}
//                                     >
//                                         <Popup>
//                                             <strong>Your Location</strong><br />
//                                             Latitude: {latitude}<br />
//                                             Longitude: {longitude}
//                                         </Popup>
//                                     </CircleMarker>
//                                 </MapContainer>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Authenticator>
//         </div>
//     );
// }

// export default App;
import { Authenticator, useTheme, Image, Heading, View } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "./App.css";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

// Fix Leaflet marker icons
import "leaflet/dist/leaflet.css";

const fireIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = fireIcon;

Amplify.configure(awsconfig);

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

// Homepage Map Component
const Home = ({ latitude, longitude, fires }) => (
    <div id="map" className="map-container">
        {/* Explanation paragraph */}
        <div className="map-description">
            <p>
                This map shows wildfires within a 200-mile radius of your current location. 
                It provides real-time data on the fires, including their location, the number of acres burned, 
                the percentage contained, and more. Stay updated on nearby incidents for safety and awareness.
            </p>
        </div>
        <MapContainer
            center={[latitude, longitude]}
            zoom={10}
            style={{
                height: "70%", 
                width: "100%", 
                borderRadius: "15px", 
                overflow: "hidden",            
            }}
            scrollWheelZoom={true} 
        >
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
);


function App() {
    const [fires, setFires] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [fireTrends, setFireTrends] = useState(null); 
    const [dashboardData, setDashboardData] = useState(null); 
    const [currentView, setCurrentView] = useState('home'); 
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

    function Hist() {
        const [fires, setFires] = useState([]);
        const [selectedCounty, setSelectedCounty] = useState('');
        const [counties] = useState([
            "Alameda", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", "Del Norte", "El Dorado",
            "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", "Lassen", "Los Angeles",
            "Madera", "Marin", "Mariposa", "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada",
            "Orange", "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", "San Diego",
            "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara",
            "Santa Cruz", "Shasta", "Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama",
            "Trinity", "Tulare", "Tuolumne", "Ventura", "Yolo", "Yuba"
        ]);
    
        const fetchFireHistory = async (county) => {
            try {
                const response = await axios.post(
                    "https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-history",
                    { county }
                );
                // Map and normalize the data for easier access in the UI
                const normalizedFires = response.data.fires.map(fire => ({
                    name: fire.Name.S,
                    acresBurned: parseFloat(fire.AcresBurned.N),
                    location: fire.Location.S,
                    started: fire.Started.S,
                    contained: `${fire.PercentContained.N}%`,
                }));
                setFires(normalizedFires);
            } catch (error) {
                console.error("Error fetching fire history:", error);
            }
        };
    
        const handleCountyChange = (event) => {
            setSelectedCounty(event.target.value);
        };
    
        const handleFetchData = () => {
            if (selectedCounty) {
                fetchFireHistory(selectedCounty);
            } else {
                alert("Please select a county first.");
            }
        };
    
        return (
            <div id="sam">
                <select id="county-dropdown" value={selectedCounty} onChange={handleCountyChange}>
                    <option value="">Select a County</option>
                    {counties.map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
    
                <button id="fetch-button" onClick={handleFetchData}>Fetch Fire History</button>
    
                {fires.length > 0 ? (
                    <div>
                        <p>Total Wildfires: {fires.length}</p>
                        <ul>
                            {fires.map((fire, index) => (
                                <li key={index}>
                                    <strong>{fire.name}</strong> - {fire.acresBurned} acres burned<br />
                                    Location: {fire.location}<br />
                                    Started: {new Date(fire.started).toLocaleString()}<br />
                                    Contained: {fire.contained}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="no-data">No fire history available.</p>
                )}
            </div>
        );
    }
    
    

    // Get user's location
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
            
        fetchFireTrends(); // Fetch fire trends data
        fetchDashboardData(); // Fetch dashboard data
        }
    }, []);

    if (latitude === null || longitude === null) {
        return <div>Loading your location...</div>;
    }

    // Render content based on currentView
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return <Home latitude={latitude} longitude={longitude} fires={fires} />;
            case 'history':
                return <Hist />;
            default:
                return <Home latitude={latitude} longitude={longitude} fires={fires} />;
        }
    };

    return (
        <div className="auth-container">
            <Authenticator components={components}>
                {({ signOut, user }) => (
                    <div className="App">
                <header className="App-header">
                    <div className="header-left">
                        {fireTrends && (
                            <div className="fire-trends">
                                <h2>Fire Trends - {fireTrends.year}</h2>
                                <p><strong>Total Fires:</strong> {fireTrends.fire_count}</p>
                                <p><strong>Total Acres Burned:</strong> {fireTrends.total_acres_burned.toFixed(2)}</p>
                            </div>
                        )}
                    </div>

                    <div className="header-middle">
                                                <h1>Wildfire Watch - California</h1>

                    </div>

                    <div className="header-right">
                        <h2>Welcome, {user.username}</h2>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                </header>

                        <div className="app-content">
                            <div className="sidebar">
                                <button onClick={() => setCurrentView('home')}>Home</button>
                                <button onClick={() => setCurrentView('history')}>Fire History</button>
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
                            <div className="content-container">
                                {renderContent()}
                                
                            </div>
                        </div>
                    </div>
                )}
            </Authenticator>
        </div>
    );
}

export default App;
