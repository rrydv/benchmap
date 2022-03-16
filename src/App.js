import "./App.css";
import MainPage from './components/MainPage'
import EntryForm from "./components/EntryForm.js";
import { useState } from "react";
import PopUpCard from './components/PopUpCard'

function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [PopUpContent, setPopUpContent] = useState({}) 

  const showEntryFormClick = () => setShowEntryForm(!showEntryForm)
  
  const showPopUpClick = (area, rating, bench_photo, view_photo) => {
    PopUpContent["area"] = area
    PopUpContent["rating"] = rating
    console.table(PopUpContent)
    setShowPopUp(!showPopUp)
  
  }
  const updateUserPosition = (latlng) => {
    setUserPosition(latlng)
    console.log(userPosition)
  }
  return (
    <div className="root-container">
      <MainPage 
      showEntryFormClick = {showEntryFormClick} 
      updateUserPosition={updateUserPosition}
      showPopUpClick = {showPopUpClick}
       />
      {showEntryForm && <EntryForm showEntryFormClick = {showEntryFormClick}/>}
      {showPopUp && <PopUpCard 
        showPopUpClick = {showPopUpClick}
        area = {PopUpContent["area"]}
        rating = {PopUpContent["rating"]}
      ></PopUpCard>}
    </div>
  );
}

export default App;
