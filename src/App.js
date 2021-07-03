import "./App.scss";
import Home from "./containers/Home";
import DetailPageContainer from "./containers/DetailPage/DetailPageContainer";
import ErrorPage from "./containers/ErrorPage";
import Header from "./containers/Header";
import React from "react";
import useStore from "./store/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const error = useStore((state) => state.error);
  const removeError = useStore((state) => state.removeError);
  const movies = useStore((state) => state.movies);
  const removeMovie = useStore((state) => state.removeMovie);

  return (
    <Router>
      <div className="App">
        <Header
          removeError={removeError}
          movies={movies}
          removeMovie={removeMovie}
        />
        {error ? (
          <ErrorPage error={error} removeError={removeError} />
        ) : (
          <Switch>
            <Route path="/movie/:id/:categoryId">
              <DetailPageContainer />
            </Route>
            <Route path="/">
              <Home type={"movie"} action={"discover"} />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
