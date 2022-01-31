import "./App.css";
import MainPage from './components/MainPage'
import EntryForm from "./components/EntryForm";
import TestForm from "./components/TestForm";
import { useState } from "react";

function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(true)

  const onEntryFormClick = () => setShowEntryForm(!showEntryForm)

  return (
    <div className="root-container">
      <MainPage onEntryFormClick = {onEntryFormClick} />
      {showEntryForm && <EntryForm onEntryFormClick = {onEntryFormClick}/>}
    </div>
  );
}

export default App;
