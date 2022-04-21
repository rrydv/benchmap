import React from 'react'
import {useState, useContext} from 'react'

const UserLocationContext = React.createContext()
const UserLocationUpdateContext = React.createContext()

export const useUserLocation = () => {
    return useContext(UserLocationContext)
}
export const useUserLocationUpdate = () => {
    return useContext(UserLocationUpdateContext)
}

export const UserLocationProvider = ({ children }) => {
    const [ipUserLocation, setIpUserLocation] = useState(null)
    const [preciseUserLocation, setPreciseUserLocation] = useState(null)
    
    const updatePreciseUserLocation = (preciseUserLocation) => {
        setPreciseUserLocation(preciseUserLocation)
    }
    const updateIpUserLocation = (ipUserLocation) => {
        setIpUserLocation(ipUserLocation)
    }
    return (
        <UserLocationContext.Provider value = {{ipUserLocation, preciseUserLocation}}>
            <UserLocationUpdateContext.Provider value = {{updateIpUserLocation, updatePreciseUserLocation}} >
            {children}
            </UserLocationUpdateContext.Provider>
        </UserLocationContext.Provider>
    )

}

export default UserLocationProvider