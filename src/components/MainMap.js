import { useState, useEffect } from "react";
import { MapContainer, TileLayer} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import Points from "./Points";
import LocationHandler from "./LocationHandler";



const MainMap = ({updateUserPosition, showPopUpClick}) => {
  const [data, setData] = useState([]);

  let data_url = process.env.REACT_APP_BENCH_ENV === 'Dev' ? 'http://localhost:5000/benches' : `${document.URL}/benches`
  console.log(process.env.REACT_APP_BENCH_ENV)
  //debugger;
  const fetchBenches = async () => {
    const res = await fetch(data_url, { mode: "cors" });
    const data = await res.json();
    return data;
  };
  
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


  return (
    <div style={{height:'100%'}}>
      <MapContainer center={[49.25, -123]} zoom={12} style={{height:'100%'}}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url= 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnJkdm4iLCJhIjoiY2wxZ3I0eWM5MWNnMjNqcGNodHFxNms4OSJ9.OP_tvYEGO5ITPC7NAIgTbg' //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Points data={data} showPopUpClick = {showPopUpClick} />
        </MarkerClusterGroup>
        <LocationHandler/>
      </MapContainer>
  
      </div>
      

  );
};

export default MainMap;
