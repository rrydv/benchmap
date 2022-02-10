import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {Box} from '@mui/material'
import { useState } from "react";
import OnClickLocationMarker from "./OnClickLocationMarker";
import UserLocationMarker from "./UserLocationMarker";
import { useFormikContext } from "formik";

const EntryFormMap = ({updateLocationForm}) => {
  const [location, setLocation] = useState([]);
  const {setFieldValue} = useFormikContext()
  const updateLocation = (latlng) => {
    setLocation(latlng);
    updateLocationForm(latlng, setFieldValue);
    console.log(latlng)
  };

  return (
    <div>
      <MapContainer center={[49.28, -122.9]} zoom={12} style={{height:'40vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <OnClickLocationMarker updateLocation={updateLocation} />
      </MapContainer>
    </div>
  );
};

export default EntryFormMap;
