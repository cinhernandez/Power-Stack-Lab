import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateProgram from "./components/CreateProgram";


function App() {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/programs/creation" component={CreateProgram}/>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;




