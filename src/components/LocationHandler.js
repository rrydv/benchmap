import {Box, Fab, Alert, Snackbar} from '@mui/material'
import { FaLocationArrow } from 'react-icons/fa'
import {useMap, CircleMarker} from 'react-leaflet'
import {useEffect, useState} from 'react'
import { useUserLocation, useUserLocationUpdate } from './UserLocationContext'

const LocationHandler = ({}) => {
    const [errorText, setErrorText] = useState(null)
    const {ipUserLocation, preciseUserLocation} = useUserLocation()
    const {updateIpUserLocation, updatePreciseUserLocation} = useUserLocationUpdate()
    
    //set location by ip

    const map = useMap()
    useEffect(() => {
        const ip_key = '383f2970-c0f9-11ec-8f6c-7ba9649aa1e3'
        const ip_url = `https://api.ipbase.com/v1/json/?apikey=${ip_key}`
        const fetchIPLocation = async () => { 
            const result = await fetch(ip_url);
            const json = await result.json();
            updateIpUserLocation([json.latitude, json.longitude])
        }
    fetchIPLocation()
    }, []);
    
    useEffect(() => {
        if (ipUserLocation){
            map.flyTo(ipUserLocation, 14)
        }
    },[Boolean(ipUserLocation)]);

  const updateUserLocation = () => {
    map.locate({watch:true}).on("locationfound", (e) => {
        updatePreciseUserLocation(e.latlng)
        
      }).on("locationerror", (e) =>{
        setErrorText(e.message)
      });
  }
  useEffect(() => {
    if (preciseUserLocation){
        map.flyTo(preciseUserLocation, 18)
    }
},[Boolean(preciseUserLocation)]);
  

  return (
  <>
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
  <Fab 
  sx ={{backgroundColor:"#ffffff"}} 
  onClick = {(e)=>{
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    updateUserLocation()
    }}>
  <FaLocationArrow style = {{
    alignSelf:"center",
    fontSize:"large",
    padding:"5px",
    }} size="30" color={preciseUserLocation ? "#1565c0":"#757575"}/>
  </Fab>
  </Box>
  
  {errorText ?  (<Snackbar open={errorText} autoHideDuration={10000} onClose = {() => setErrorText(null)}>
    <Alert severity = "error">
    {errorText}
    </Alert>
    </Snackbar>): null}

    {preciseUserLocation ? <CircleMarker center={preciseUserLocation} radius={7}/> : null }
  </>
  
  )
  }


export default LocationHandler