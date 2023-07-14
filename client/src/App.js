import React, {useContext} from "react";
import { AppContext } from './AppContext';
import { AppProvider } from './AppContext';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";


import Dashboard from "./components/Dashboard";

import FitnessForm from "./components/FitnessForm";







function App() {
  const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);

  // const [exercises, setExercises] = useState([]);

  // useEffect(() => {
  //   fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
  //     headers: {
  //       "RapidAPI-Key": "db2f01624amsh0fff27ac3550af1p1a9cebjsne3a4f0b94a40",
  //       "RapidAPI-Host": "exercisedb.p.rapidapi.com"
  //   }
  //   })
  //     .then((response) => response.json())
  //     .then((exercises) => setExercises(exercises)); 

  // }, []);

  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

 



  return (
  
     <Router>
      <NavBar  handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route 
                exact path="/login"
                render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            />
          {/* <Route path="/exercises" component={ExerciseList}/> */}
          <Route path="/signup" component={SignUp}/>
          <Route path="/create/lift_sets" component={FitnessForm} />
          <Route exact path="/dashboard" 
            render={(props) => 
              isLoggedIn ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          /> 
        
        </Switch>
      </Router>
   
  );
}

export default App;




