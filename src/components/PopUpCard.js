import ReactDOM  from "react-dom"
import { useState } from "react";
import {Grid, Box, Typography, Rating, Button} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import DirectionsIcon from '@mui/icons-material/Directions';
import PopUpGallery from "./PopUpGallery";
import ClickableBackground from "./ClickableBackground";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const PopUpCard = ({showPopUpClick, lat, lng, area, rating, benchPhoto, viewPhoto}) => {
  
  const images = [
    benchPhoto,
    viewPhoto
  ]
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '5c595a59cb775a5e31ad64f13f216af3', //can't hide the api key on front-end?
    lat: lat,
    lon: lng,
    lang: 'en',
    unit: 'metric', 
  });

  
  return ReactDOM.createPortal(
 <ClickableBackground closeOnClick={showPopUpClick}>
 <Box
    sx={{
     
      height: {xs: "calc(var(--vh, 1vh)*100)", lg: "100vh" },
      height: "100vh",
      display:"flex",
      flexDirection:"column",
      backgroundColor: "rgba(255,255,255)",
      m: "0",
      zIndex: "appBar",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }}
  >       

      <Grid container spacing = {2} p={5}>
        <Grid item xs={12} p={5}> 
        <Box
    style={{
      display:'flex',
      justifyContent:'space-between',
      padding:10
    }}>
      <Typography variant = "h3"> {area}</Typography> 
      <Button onClick={showPopUpClick}>
        <CloseIcon />
      </Button>
</Box>

        
        </Grid>
        <Grid item xs={12}>

        <PopUpGallery images = {images}></PopUpGallery>
        </Grid>
        
        <Grid item xs = {12} md={6}>

        <Grid 
        container
        direction="column" 
        alignItems="center"
        >
        <Grid item xs={6} md={12} pt={5}>  
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center"
        }}>
        <Button href={`https://maps.google.com/maps?q=${lat},${lng}`}> 
          <DirectionsIcon style = {{fontSize: 100}}/>
        </Button>
        
        <Typography 
        display="block" 
        variant = "h5"> 
        Open in GoogleMaps 
        </Typography>
        </div>
        </Grid>
        
        <Grid item xs={6} md ={12} p={5}>
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center"
        }}> 
        <Typography 
        component="legend" 
        variant = "h5"
        align="center"> Rating </Typography>
              <Rating
                size="large"
                precision={0.5}
                value={rating}
                readOnly
              />
         </div>
        </Grid>
        </Grid>
        </Grid>
        
        <Grid item xs = {12} md = {6}>
        <Typography 
        variant = "h5" align="center"> Weather </Typography> 
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel= {area}
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast={false}/>
        </Grid>

      </Grid>
    </Box>
    </ClickableBackground>, document.getElementById('root')
  )
}

export default PopUpCard