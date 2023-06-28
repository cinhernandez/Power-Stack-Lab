import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FitnessForm from "./components/FitnessForm";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import MaxLift from "./components/MaxLift";



function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
     <Router>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route 
                exact path="/login"
                render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            />
          <Route path="/signup" component={SignUp}/>
         
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/max_lifts" component={MaxLift} />
          

{/*             
            //     exact path="/dashboard"
            //     render={(props) =>
            //     isLoggedIn ? (
            //         <Dashboard {...props} />
            //     ) : (
            //         <Redirect to="/login" />
            //     )
            //     } */}
            
          <Route path="/about" component={About}/>
          
        </Switch>
        
      </Router>
  );
}

export default App;




