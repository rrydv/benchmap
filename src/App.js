import "./App.css";
import MainPage from './components/MainPage'
import EntryForm from "./components/EntryForm";
import { useState } from "react";

function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false)

  const showEntryFormClick = () => setShowEntryForm(!showEntryForm)

  const updateUserPosition = (latlng) => {
    setUserPosition(latlng)
    console.log(userPosition)
  }
  return (
    <div className="root-container">
      <MainPage showEntryFormClick = {showEntryFormClick} updateUserPosition={updateUserPosition} />
      {showEntryForm && <EntryForm showEntryFormClick = {showEntryFormClick}/>}
    </div>
  );
}

export default App;
