import React, { useEffect, useState } from "react";
import { Switch, Route, Router } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Switch>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
