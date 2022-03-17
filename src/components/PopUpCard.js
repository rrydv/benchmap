import ReactDOM  from "react-dom"
import { useState } from "react";
import {Grid, Box, Typography, Rating} from "@mui/material"
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


const PopUpCard = ({area, rating, benchPhoto, viewPhoto}) => {
  const carouselClick = (index, item)=> console.log(index,item)
  
  return ReactDOM.createPortal(
    <Box
    sx={{
      display: "flex",
      width: "100wh",
      height: { xs: "calc(var(--vh, 1vh)*100)", lg: "100vh" },
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255)",
      position: "absolute",
      m: "0",
      zIndex: "appBar",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <div>
      <Grid container spacing = {2} p={5}>
        <Grid item xs={12} p={5}> 
        <Typography variant = "h3"> {area}</Typography>
        
        </Grid>
        <Grid item xs={12}>
        <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        onClickItem={carouselClick()}
        >
        <div>
        <img src={benchPhoto} style={{width:"50%", borderRadius:"5%"}} ></img>
        </div>
        <div>
        <img src={viewPhoto} style={{width:"50%", borderRadius:"5%"}} onClick={console.log("click")}></img>
        </div>
        </Carousel>
        
        </Grid>
        <Grid item xs={6}> 
        <Typography component="legend">Bench Rating </Typography>
              <Rating
                precision={0.5}
                value={rating}
                readOnly
              /> 
        </Grid>

        <Grid item xs={6}> Weather Widget :)
        </Grid>
        <Grid item xs={6}> DirectionsIcon
        </Grid>
        <Grid item xs = {12}>
        
        </Grid>
      </Grid>
      </div>
    </Box>, document.getElementById('root')
  )
}

export default PopUpCard