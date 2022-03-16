import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import {Box, Button} from "@mui/material"
import {FaLocationArrow} from 'react-icons/fa'

import MarkerClusterGroup from "react-leaflet-markercluster";
import Points from "./Points";
import UserLocationMarker from "./UserLocationMarker";



const MainMap = ({updateUserPosition, showPopUpClick}) => {
  const [data, setData] = useState([]);
  const [userLocationBool, setUserLocationBool] = useState(false)


  let url = 'http://localhost:5000/benches'//`${document.URL}/benches`;

  const fetchBenches = async () => {
    const res = await fetch(url, { mode: "cors" });
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
      <MapContainer center={[49.28, -122.9]} zoom={12} style={{height:'100%'}}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Points data={data} showPopUpClick = {showPopUpClick} />
        </MarkerClusterGroup>
        {userLocationBool && <UserLocationMarker updateUserPosition={updateUserPosition}/>}
      </MapContainer>
      
      <Box sx = {{
          display:"flex",
          textAlign:"center", 
          justifyContent:"center",
          position: "absolute",
          borderRadius:"50%",
          backgroundColor:"white",
          width:"50px",
          height:"50px",
          bottom:"40px",
          right: "20px",
          zIndex:"1000"
        }}> 
        <Button onClick = {()=> setUserLocationBool(true)}>
        <FaLocationArrow style = {{
          alignSelf:"center",
          fontSize:"large",
          padding:"5px",
          }} size="30" color={userLocationBool ? "#1565c0":"#757575"}/>
        </Button>
        </Box>
        
      </div>
      

  );
};

export default MainMap;
