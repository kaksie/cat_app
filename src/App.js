import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/pages/Home";
import Details from "./Components/pages/Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={Details} />
        </Switch>
      </div>

      <ToastContainer />
    </Router>
  );
}

export default App;
