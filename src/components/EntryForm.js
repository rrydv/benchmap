import {useState} from 'react'
import { Formik} from 'formik';
import * as yup from 'yup';
import EntryFormMap from "./EntryFormMap";
import {
  TextField,
  Button,
  Box,
  Rating,
  Typography,
  Grid,
  FormHelperText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CircularProgress from '@mui/material/CircularProgress'
import { ErrorSharp } from "@mui/icons-material";
import EntryFormBackground from "./EntryFormBackground";


const EntryForm = ({showEntryFormClick}) => {
  const [submitted,setSubmitted] = useState(false)
  
  const updateLocationForm = (latlng, setFieldValue) => {
    setFieldValue("lat",latlng.lat)
    setFieldValue("lng",latlng.lng)
  }

  //form submission
  const postForm = (formData) => {
    
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

  const fileSizeValidation = (file) =>{
    const MAX_SIZE = 10485760 //10 megabytes
    return file ? file.size < MAX_SIZE ? true : false : false
  }

  const FormSchema = yup.object().shape({
    area: yup.string()
    .min(5, "Name must be at least 5 characters.")
    .max(20, "Name can't be more than 20 characters.")
    .required("Required"),
    benchRating: yup.number()
    .min(0.5, "Rating can't be less than 0.5!")
    .max(5, "Rating can't be more than 5!")
    .required("Required"),
    lat: yup.number()
    .required(),
    lng: yup.number()
    .required(),
    viewPhoto: yup.mixed()
    .required("Need at least one photo from the bench!")
    .test("is-below-10mb","Max file size is 10mb",
    fileSizeValidation)

    //add benchPhoto validation
  })

  return (
    <EntryFormBackground showEntryFormClick={showEntryFormClick}>
      <Formik
      initialValues = {{
        lat: "",
        lng: "",
        area: "",
        benchRating: 0,
        benchPhoto: null,
        viewPhoto: null
      }}
      
      validationSchema = {FormSchema}
      
      onSubmit= {(values,actions)=> {
        
        console.log(values)
        const formData = new FormData()
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        console.log([...formData.values()]);
        postForm(formData)
        actions.setSubmitting(false)
      }}
      >
      {({values, errors, touched, 
      handleChange, handleBlur, handleSubmit, 
      setFieldValue, isSubmitting}) => (
        <form onSubmit = {handleSubmit} method="POST" encType="multipart/form-data">
          <Box
          sx={{
            display:'flex',
            justifyContent:'right'
          }}>
            <Button onClick={showEntryFormClick}>
              <CloseIcon />
            </Button>
          </Box>
          {isSubmitting && !submitted ? 
          <Box sx = {{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            minHeight:"300px",
            flexDirection:"column"
          }}
          > <div> Submitting... </div><CircularProgress size = {60} style = {{padding:"10px"}} /> 
          </Box>
          
          : submitted ? "Test" 
          
          :
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
                value={values.lat === null ? " " : values.lat}
                size="small"
                error = {errors.lat && touched.lat ? true : false}
                helperText = {errors.lat && touched.area ? errors.lat : null}
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
                value={values.lng === null ? " " : values.lng}
                size="small"
                error = {errors.lng && touched.lng ? true : false}
                helperText = {errors.lng && touched.lng ? errors.lng : null}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="legend">Bench Rating</Typography>
              <Rating
                name="benchRating"
                precision={0.5}
                value={values.benchRating}
                onChange={(e, newValue) => setFieldValue("benchRating", newValue)}
              />
              {errors.benchRating && touched.benchRating && <FormHelperText error={true} style = {{display:"flex", justifyContent:"center"}}>Must provide a rating</FormHelperText>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-helperText"
                label="Area"
                helperText={errors.area && touched.area ? errors.area : "e.g. Lighthouse Park"}
                onChange={handleChange}
                onBlur = {handleBlur}
                name="area"
                size="small"
                error = {errors.area && touched.area ? true : false}
              />
            </Grid>
            
            
            <Grid item xs={6}>
              <Button variant="contained" component="label">
              <AddAPhotoIcon/>&nbsp;Bench Photo 
              <input name="benchPhoto" type="file" accept="image/png, image/jpeg" 
              onChange={(e)=>setFieldValue(e.target.name,e.target.files[0])} hidden />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                <AddAPhotoIcon/>&nbsp;View from Bench
                <input name="viewPhoto" type="file" accept="image/png, image/jpeg" 
                onChange={(e)=>setFieldValue(e.target.name,e.target.files[0])} hidden />
              </Button>
              {errors.viewPhoto && touched.viewPhoto && <FormHelperText error={true} style = {{display:"flex", justifyContent:"center"}}>{errors.viewPhoto}</FormHelperText>}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>}
        </form>
      )}
        </Formik>
  </EntryFormBackground>
  );
};

export default EntryForm;
