import { MapContainer, TileLayer } from "react-leaflet";
import OnClickLocationMarker from "./OnClickLocationMarker";
import { useFormikContext } from "formik";
import LocationHandler from "./LocationHandler";
import { useUserLocation } from './UserLocationContext'
const EntryFormMap = ({updateLocationForm}) => {
  const {ipUserLocation, preciseUserLocation} = useUserLocation()
  const {setFieldValue} = useFormikContext()
  const updateLocation = (latlng) => {
    updateLocationForm(latlng, setFieldValue);
  };

  return (
    <div>
      <MapContainer center={preciseUserLocation ? preciseUserLocation : ipUserLocation ? ipUserLocation : [49.28, -122.9]} zoom={12} style={{height:'40vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnJkdm4iLCJhIjoiY2wxZ3I0eWM5MWNnMjNqcGNodHFxNms4OSJ9.OP_tvYEGO5ITPC7NAIgTbg'
        />
        <OnClickLocationMarker updateLocation={updateLocation} />
        <LocationHandler/>
      </MapContainer>
    </div>
  );
};

export default EntryFormMap;
