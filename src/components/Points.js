import { useEffect, useState } from "react";
import { CircleMarker, Marker, useMap } from "react-leaflet";
const Points = ({ data, showPopUpClick }) => {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState();
  useEffect(() => {
    setZoomLevel(map.getZoom());
  });

  //console.log(Object.keys(map));
  //console.log(map.getZoom());
  return (
    <>
      {data.map((data) => (
        <CircleMarker
          key={data._id.$oid}
          center={[data.lat, data.lng]}
          radius={3}
          eventHandlers = {{
            click: (e)=>
            
            showPopUpClick(data.area, data.rating)
          }}
        ></CircleMarker>
      ))}
    </>
  );
};

export default Points;
