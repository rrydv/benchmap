import { useEffect, useState } from "react";
import { CircleMarker, Marker, useMap } from "react-leaflet";
import PopUpCard from "./PopUpCard";
const Points = ({ data }) => {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState();
  useEffect(() => {
    setZoomLevel(map.getZoom());
  });

  const [showPopUp, setShowPopUp] = useState(false);
  const [PopUpContent, setPopUpContent] = useState({});
  const showPopUpClick = (lat, lng, area, rating, benchPhoto, viewPhoto) => {
    const content = {
      lat: lat, 
      lng: lng,
      area: area,
      rating: rating,
      benchPhoto: benchPhoto,
      viewPhoto: viewPhoto
    }
    setPopUpContent(content)
    setShowPopUp(!showPopUp);
  };
  //console.log(Object.keys(map));
  //console.log(map.getZoom());
  return (
    <>
      {data.map((data) => (
        <CircleMarker
          key={data._id.$oid}
          center={[data.lat, data.lng]}
          radius={3}
          eventHandlers={{
            click: (e) => showPopUpClick(data.lat, data.lng, data.area, data.rating, data.benchPhoto, data.viewPhoto),
          }}
        ></CircleMarker>
      ))}
      {showPopUp && (
        <PopUpCard
          lat = {PopUpContent["lat"]}
          lng = {PopUpContent["lng"]}
          showPopUpClick={showPopUpClick}
          area={PopUpContent["area"]}
          rating={PopUpContent["rating"]}
          benchPhoto={PopUpContent["benchPhoto"]}
          viewPhoto={PopUpContent["viewPhoto"]}
        ></PopUpCard>
      )}
    </>
  );
};

export default Points;
