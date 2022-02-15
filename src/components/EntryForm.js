import {useState, useRef} from 'react'
import { Formik} from 'formik';
import * as yup from 'yup';
import EntryFormMap from "./EntryFormMap";
import EntryFormFeedback from './EntryFormFeedback';
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
import EntryFormBackground from "./EntryFormBackground";


const EntryForm = ({showEntryFormClick}) => {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const httpResponseRef = useRef()
  
  const updateLocationForm = (latlng, setFieldValue) => {
    setFieldValue("lat",latlng.lat)
    setFieldValue("lng",latlng.lng)
  }

  //form submission
  const postForm = async (formData) => {
    
    const url = `${document.URL}/add_bench` //'http://127.0.0.1:5000/add_bench'
    const response = await fetch(url,{
      method:'POST',
      body: formData
    })
    const httpResponse = await response.text()

    return {
      httpOk: response.ok,
      httpCode: response.status,
      httpResponse: httpResponse
    }
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
  
  const sleep = (ms) => new Promise((resolve)=>setTimeout(resolve, ms))
  
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
      
      onSubmit= {async (values,actions)=> {
        const formData = new FormData()
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        const {httpResponse, httpOk} = await postForm(formData)
        for (var value of formData.values()){
          console.log(value)
        }
        
        httpResponseRef.current = httpResponse
        if (httpOk){
          setSubmitted(true)
          await sleep(4000)
          setSubmitted(false)
          actions.resetForm()
          //actions.setSubmitting(false)
        }
        else{
          setSubmitted(true)
          setSubmitError(true)
          await sleep(4000)
          setSubmitted(false)
          setSubmitError(false)
          //actions.setSubmitting(false)
          actions.resetForm()
        }
        
        
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
          {isSubmitting ? 
          <EntryFormFeedback 
          submitted={submitted} 
          submitError = {submitError} 
          httpResponseRefCurrent = {httpResponseRef.current} />
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
                helperText = {errors.lat && touched.lat ? errors.lat : null}
              />
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
