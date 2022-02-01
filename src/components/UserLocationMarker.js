import { useMap, CircleMarker } from "react-leaflet";
import { useState, useEffect } from "react";

const UserLocationMarker = ({updateUserPosition}) => {
  const [userPosition, setUserPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setUserPosition(e.latlng);
      updateUserPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom());
      map.setZoom(17);
      map.setView(e.latlng);
    });
  }, []);
  return userPosition === null ? null : (
    <CircleMarker center={userPosition} radius={2} />
  );
};

export default UserLocationMarker;
