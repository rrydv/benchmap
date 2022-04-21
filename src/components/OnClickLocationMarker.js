import { useMapEvent, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import { useUserLocation } from './UserLocationContext'
const OnClickLocationMarker = ({ updateLocation }) => {
  const {preciseUserLocation} = useUserLocation()
  const [latlng, setLatLng] = useState(null);

  useEffect(() => {
    if (preciseUserLocation){
      setLatLng(preciseUserLocation);
      updateLocation(preciseUserLocation);
    }
}, [Boolean(preciseUserLocation)]);
  useMapEvent("click", (e) => {
    setLatLng(e.latlng);
    updateLocation(e.latlng);
  });
  return latlng === null ? null : <Marker position={latlng}></Marker>;
};

export default OnClickLocationMarker;
