import './App.css';
import { Amplify } from 'aws-amplify';
import React, { useState, useEffect } from "react";
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import config from './aws-exports';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Amplify.configure(config);

function App() {
//     const Data = {
//         fires: [
//             {
//                 UniqueId: { S: "98160dda-7fdf-4765-995e-d8fb35460979" },
//                 Latitude: { N: "36.496333" },
//                 Longitude: { N: "-118.139117" },
//                 Name: { S: "Horseshoe Fire" },
//                 AcresBurned: { N: "4530" },
//                 PercentContained: { N: "61" },
//                 AdminUnit: { S: "Inyo National Forest" },
//                 Location: { S: "Horseshoe Meadows Road, near Lone Pine" },
//             },
//             {
//                 UniqueId: { S: "d3452156-04ed-47d1-ae1a-3bb6c5478310" },
//                 Latitude: { N: "32.72754" },
//                 Longitude: { N: "-116.93722" },
//                 Name: { S: "Millar Fire" },
//                 AcresBurned: { N: "11" },
//                 PercentContained: { N: "100" },
//                 AdminUnit: { S: "CAL FIRE San Diego Unit" },
//                 Location: { S: "Campo Rd & Millar Ranch Rd, Spring Valley" },
//             },
//         ],
//     };

    
      const [fireData, setFireData] = useState([]);
      const [loading, setLoading] = useState(true);
      
      // Fetch fire data from the API
      useEffect(() => {
      const fetchFireData = async () => {
      try {
      const response = await fetch(
      'https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-info?latitude=33.917991&longitude=-116.91162'
      );
      const data = await response.json();
      
          console.log('Fetched Fire Data:', data); // Log the entire response
          setFireData(data.fires || []); // Set the fires array or an empty array
          setLoading(false);
        } catch (error) {
          console.error('Error fetching fire data:', error); // Log any errors
          setLoading(false);
        }
      };
      
      fetchFireData();
      
      }, []);

    return (
        <Authenticator>
            {({ signOut }) => (
                <div className="App">
                    <header className="App-header">
                        <h1>Forest Fire Monitoring Dashboard</h1>
                        <button onClick={signOut}>Sign Out</button>
                    </header>
                    <main>
                        <MapContainer center={[36.7783, -119.4179]} zoom={6} style={{ height: "90vh", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            />
                            {Data.fires.map((fire, index) => (
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
            )}
        </Authenticator>
    );
}

export default App;
