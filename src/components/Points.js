import { useEffect, useState } from "react";
import { CircleMarker, Marker, useMap } from "react-leaflet";
const Points = ({ data }) => {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState();

  useEffect(() => {
    setZoomLevel(map.getZoom());
  });

  //console.log(Object.keys(map));
  //console.log(map.getZoom());
  return (
    <div>
      {data.map((bench) => (
        <CircleMarker
          key={bench._id.$oid}
          center={[bench.lat, bench.lng]}
          radius={3}
        ></CircleMarker>
      ))}
    </div>
  );
};

export default Points;
