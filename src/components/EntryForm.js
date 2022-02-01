import { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import EntryFormMap from "./EntryFormMap";
import {
  TextField,
  Button,
  Box,
  Rating,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const EntryForm = ({onEntryFormClick}) => {
  const [locationForm, setLocationForm] = useState(null);
  const [formState, setFormState] = useState({});
  const [files,setFiles] = useState(null)
  const [ratingValue, setRatingValue] = useState();
  
  const updateLocationForm = (latlng) => setLocationForm(latlng);
  //input handlers
  const handleChange = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  };
  
  const handleFileInput = (e) =>{
    setFiles({...files,[e.target.name] : e.target.files[0]})
  }
  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {
      ...formState,
      lat: locationForm.lat, //some weird stuff happening in the form, so setting it here from state
      lng: locationForm.lng,
      rating: ratingValue,
    };

    const formData = new FormData()
    Object.keys(result).forEach(key => formData.append(key, result[key]));
    Object.keys(files).forEach(key => formData.append(key, files[key]));
    
    console.log([...formData.values()]);
    
    const url = `${document.URL}/add_bench`
    fetch(url,{
      method:'POST',
      body: formData
    }).then((response)=>
      response.text
    ).then((text) =>
      console.log(text)
    ).catch((err)=>
      console.log(err)
    )
  };



  //close form on click outside the form div
  const entryFormRef = useRef()
  const handleClickOutside = e => {
    if (!entryFormRef.current.contains(e.target)) {
        onEntryFormClick();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });


  return (
    <Box
      sx={{
        display: "flex",
        width: "100wh",
        height: "100vh",
        height: {xs: "calc(var(--vh, 1vh)*100)", lg: '100vh'},
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
      <Box
        p={1}
        sx={{
          backgroundColor: "#FFF",
          borderRadius: "0.5%",
          display:'flex',
          flexDirection:'column',
          width:'90%',
          maxHeight:'100%',
          overflowY:'auto'
        }}
        ref={entryFormRef}
      >
        <form onSubmit = {handleSubmit} method="POST" encType="multipart/form-data">
          <Box
          sx={{
            display:'flex',
            justifyContent:'right'
          }}>
            <Button onClick={onEntryFormClick}>
              <CloseIcon />
            </Button>
          </Box>
          <Grid container={true} spacing={2} align="center">
            <Grid item xs={12}>
              <EntryFormMap
                updateLocationForm={updateLocationForm}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-disabled"
                name="lat"
                label="Latitude"
                variant="filled"
                disabled
                value={locationForm === null ? " " : locationForm.lat}
                size="small"
              />
              {/* onChange is not handled here, but in the submit function */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lng"
                id="outlined-disabled"
                label="Longitude"
                variant="filled"
                disabled
                value={locationForm === null ? " " : locationForm.lng}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="legend">Bench Rating</Typography>
              <Rating
                name="benchRating"
                value={null}
                precision={0.5}
                value={ratingValue}
                onChange={(e, newValue) => setRatingValue(newValue)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-helperText"
                label="Area"
                helperText="e.g. Lighthouse Park"
                onChange={handleChange}
                name="area"
                size="small"
              />
            </Grid>
            
            
            <Grid item xs={6}>
              <Button variant="contained" component="label">
              <AddAPhotoIcon/>&nbsp;Bench Photo 
              <input name="benchPhoto" type="file" accept="image/png, image/jpeg" onChange={handleFileInput} hidden />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box>
              <Button variant="contained" component="label">
                <AddAPhotoIcon/>&nbsp;View from Bench
                <input name="viewPhoto" type="file" accept="image/png, image/jpeg" onChange={handleFileInput} hidden />
              </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EntryForm;
