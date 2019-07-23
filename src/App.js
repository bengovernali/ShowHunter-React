import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
}

export default App;
