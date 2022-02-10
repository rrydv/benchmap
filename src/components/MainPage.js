import {useEffect} from 'react'
import {Box} from '@mui/material'
import Navigation from './Navigation'
import MainMap from './MainMap'

const MainPage = ({showEntryFormClick, updateUserPosition}) =>{

    useEffect(()=>{
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)},
        [])

    

    return (
        <Box sx={{
            height: '100vh',
            height: {xs: "calc(var(--vh, 1vh)*100)", lg: '100vh'},
            display: 'flex',
            flexDirection:'column'
        }}>
        <Navigation showEntryFormClick = {showEntryFormClick} />
        <MainMap updateUserPosition = {updateUserPosition} />

        </Box>
    )

}

export default MainPage