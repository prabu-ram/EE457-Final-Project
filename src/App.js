
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
);


function App() {
    const [fires, setFires] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [currentView, setCurrentView] = useState('home'); // Manage the current view

    // Fetch fire data based on user's location
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
                return <div className="placeholder">Hello from <strong>Fire History</strong></div>;
            case 'trends':
                return <div className="placeholder">Hello from <strong>Fire Trends</strong></div>;
            case 'dashboard':
                return <div className="placeholder">Hello from <strong>Dashboard Data</strong></div>;
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
                            <h1>Welcome, {user.username}</h1>
                            <button onClick={signOut}>Sign Out</button>
                        </header>
                        <div className="app-content">
                            <div className="sidebar">
                                <button onClick={() => setCurrentView('home')}>Home</button>
                                <button onClick={() => setCurrentView('history')}>Fire History</button>
                                <button onClick={() => setCurrentView('trends')}>Fire Trends</button>
                                <button onClick={() => setCurrentView('dashboard')}>Dashboard Data</button>
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
