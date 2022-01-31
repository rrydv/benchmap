import { useMapEvent, Marker } from "react-leaflet";
import { useState } from "react";

const OnClickLocationMarker = ({ updateLocation }) => {
  const [latlng, setLatLng] = useState(null);
  useMapEvent("click", (e) => {
    setLatLng(e.latlng);
    updateLocation(e.latlng);
  });
  return latlng === null ? null : <Marker position={latlng}></Marker>;
};

export default OnClickLocationMarker;
