import {Box} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'
import EntryFormBackground from "./EntryFormBackground";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Fab from '@mui/material/Fab';

const EntryFormFeedback = ({submitted, submitError, httpResponseRefCurrent}) => {

    const feedbackContent = (submitted, submitError,httpResponseRefCurrent) => {
    if (submitted){

        if (submitError){
        
            return (
            <>
                <div> {httpResponseRefCurrent} </div>
                <Fab disabled = {true} style = {{background: "#f44336"}}> 
                    <ErrorIcon style={{fill:"white"}} />
                </Fab>
            </>
        )}
        else{
            return (
                <>
                    <div> {httpResponseRefCurrent} </div>
                    <Fab color="primary" disabled = {true} style = {{background: "#4caf50"}}>
                        <CheckIcon style={{fill:"white"}}/> 
                    </Fab>
                </>
            )
        }
    }
    else {

    return (
    <> 
        <div> Submitting... </div> 
        <CircularProgress size = {60} style = {{padding:"10px"}} />
    </>)

    }
        
    }
    const content = feedbackContent(submitted, submitError, httpResponseRefCurrent)
        
    return (
    <Box sx = {{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            minHeight:"300px",
            flexDirection:"column"
          }}>
        <div style = {{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          {content}
        </div>

    </Box>
  )
}

export default EntryFormFeedback