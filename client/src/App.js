import React, {useContext} from "react";
import { AppContext } from './AppContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import MaxLiftForm from "./components/MaxLiftForm";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import FitnessForm from "./components/FitnessForm";
import Posts from "./components/Posts";








function App() {
  const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);

 
  
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
          <Route path="/exercises" component={Exercises}/>
          <Route path="/lift_sets" component={FitnessForm} />
          <Route path="/posts" component={Posts} />
          <Route path="/max_lifts" component={MaxLiftForm} />
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




