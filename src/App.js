import "./App.css";
import MainPage from "./components/MainPage";
import EntryForm from "./components/EntryForm.js";
import { useState } from "react";
import UserLocationProvider from "./components/UserLocationContext";
function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);

  const showEntryFormClick = () => setShowEntryForm(!showEntryForm);

  const updateUserPosition = (latlng) => {
    setUserPosition(latlng);
    console.log(userPosition);
  };
  return (
    <div className="root-container">
      <UserLocationProvider>
      <MainPage
        showEntryFormClick={showEntryFormClick}
        updateUserPosition={updateUserPosition}
      />
      {showEntryForm && <EntryForm showEntryFormClick={showEntryFormClick} />}
      </UserLocationProvider>
    </div>
  );
}

export default App;
