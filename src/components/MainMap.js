import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Points from "./Points";

import { Container } from "react-bootstrap";

const MainMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBenches = async () => {
      const benchesFromServer = await fetchBenches();
      setData(benchesFromServer);
    };
    getBenches();
    return () => {
      setData({});
    };
  }, []);
  let url = `${document.URL}/benches`;

  const fetchBenches = async () => {
    const res = await fetch(url, { mode: "cors" });
    const data = await res.json();
    return data;
  };

  return (
      <MapContainer center={[49.28, -122.9]} zoom={12} style={{height:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Points data={data} />
        </MarkerClusterGroup>
      </MapContainer>
  );
};

export default MainMap;
