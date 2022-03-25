import { useEffect, useRef } from "react";
import {Box} from "@mui/material"

const ClickableBackground = ({closeOnClick, children}) => {
  //close form on click outside the form div
  const BackgroundRef = useRef();
  const handleClickOutside = (e) => {
    if (!BackgroundRef.current.contains(e.target)) {
      closeOnClick();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return(
  <Box
    sx={{
      display: "flex",
      width: "100wh",
      height: "100vh",
      height: { xs: "calc(var(--vh, 1vh)*100)", lg: "100vh" },
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(50,50,50,0.7)",
      position: "absolute",
      m: "0",
      zIndex: "appBar",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <Box
      p={1}
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "0.5%",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxHeight: "100%",
        overflowY: "auto",
      }}
      ref={BackgroundRef}
    >
    {children}

    </Box>
  </Box>
  )
};

export default ClickableBackground