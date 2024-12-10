import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const FireMap = ({ data }) => {
    const center = [36.7783, -119.4179]; // Center of California

    return (
        <MapContainer center={center} zoom={6} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {data.fires.map((fire) => (
                <Marker
                    key={fire.UniqueId.S}
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
                        <em>County:</em> {fire.County.S}
                        <br />
                        <em>Acres Burned:</em> {fire.AcresBurned.N}
                        <br />
                        <em>Percent Contained:</em> {fire.PercentContained.N}%
                        <br />
                        <em>Admin Unit:</em> {fire.AdminUnit.S}
                        <br />
                        <em>Type:</em> {fire.Type.S}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default FireMap;
