import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {Box} from '@mui/material'
import { useState } from "react";
import OnClickLocationMarker from "./OnClickLocationMarker";
import UserLocationMarker from "./UserLocationMarker";

const EntryFormMap = ({ updateLocationForm }) => {
  const [location, setLocation] = useState([]);
  const updateLocation = (latlng) => {
    setLocation(latlng);
    updateLocationForm(latlng);
  };

  return (
    <Box sx={{

    }}>
      <MapContainer center={[49.28, -122.9]} zoom={12} style={{height:'40vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserLocationMarker />
        <OnClickLocationMarker updateLocation={updateLocation} />
      </MapContainer>
    </Box>
  );
};

export default EntryFormMap;
