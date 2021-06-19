import "./App.css";
import Home from "./containers/Home";
import DetailPage from "./containers/DetailPage";
import Header from "./containers/Header";
import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/movie/:id/:categoryId">
            <DetailPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
