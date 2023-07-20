import React, {useContext} from "react";
import { AppContext } from './AppContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProgramGenerator from "./components/ProgramGenerator";
import MaxLiftForm from "./components/MaxLiftForm";
import Dashboard from "./components/Dashboard";
import FitnessForm from "./components/FitnessForm";
import Posts from "./components/Posts";
import Footer from "./components/Footer";




function App() {
  const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);

 
  

 

  return (
  
     <Router>
      <NavBar  />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route 
                exact path="/login"
                render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            />
          {/* <Route path="/exercises" component={ExerciseList}/> */}
          <Route path="/signup" component={SignUp}/>
          <Route path="/generate_program" component={ProgramGenerator} />
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




