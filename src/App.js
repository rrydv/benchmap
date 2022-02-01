import "./App.css";
import MainPage from './components/MainPage'
import EntryForm from "./components/EntryForm";
import { useState } from "react";

function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(true)

  const onEntryFormClick = () => setShowEntryForm(!showEntryForm)

  const updateUserPosition = (latlng) => {
    setUserPosition(latlng)
    console.log(userPosition)
  }
  return (
    <div className="root-container">
      <MainPage onEntryFormClick = {onEntryFormClick} updateUserPosition={updateUserPosition} />
      {showEntryForm && <EntryForm onEntryFormClick = {onEntryFormClick}/>}
    </div>
  );
}

export default App;
