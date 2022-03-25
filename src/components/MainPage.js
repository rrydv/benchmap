import {useState, useEffect} from 'react'
import {Box} from '@mui/material'
import Navigation from './Navigation'
import MainMap from './MainMap'


const MainPage = ({showEntryFormClick, updateUserPosition, showPopUpClick}) =>{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    let resizeWindow = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth)
    };
  
    useEffect(() => {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    const vh = windowHeight * 0.01
    const vw = windowWidth * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    document.documentElement.style.setProperty('--vw', `${vw}px`)
    


      

    return (
        <Box sx={{
            height: '100vh',
            height: {xs: "calc(var(--vh, 1vh)*100)", lg: '100vh'},
            display: 'flex',
            flexDirection:'column'
        }}>
        <Navigation 
          showEntryFormClick = {showEntryFormClick} />
        <MainMap 
          updateUserPosition = {updateUserPosition} 
          showPopUpClick={showPopUpClick}/>
        
        </Box>
    )

}

export default MainPage