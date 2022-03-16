import {Grid, Box, Typography, Rating} from "@mui/material"

const PopUpCard = ({area, rating, bench_photo, view_photo}) => {
  return (
    <Box
    sx={{
      display: "flex",
      width: "100wh",
      height: "100vh",
      height: { xs: "calc(var(--vh, 1vh)*100)", lg: "100vh" },
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(50,50,50,0.7)",
      position: "absolute",
      m: "0",
      zIndex: "appBar",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }}
  >
      <Grid container spacing = {2}>
        <Grid item xs={12} p={5}> {area} 
        </Grid>

        <Grid item xs={6}> 
        <Typography component="legend">Bench Rating
        </Typography>
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
    </Box>
  )
}

export default PopUpCard