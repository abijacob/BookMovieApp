import React from "react";
import BookShow from "./bookshow/BookShow";
import Home from "./home/Home"
import Details from './details/Details'
import Confirmation from './confirmation/Confirmation'
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = () => {
  const baseUrl = "http://localhost:8085/api/v1/";

  return (
    <Router>
      <div className="main-container">
          <Route
              path="/bookshow/:id"
              render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
          />
          <Route
              exact
              path="/"
              render={(props) => <Home {...props} baseUrl={baseUrl} />}
          />
          <Route
              path="/movie/:id"
              render={(props) => <Details {...props} baseUrl={baseUrl} />}
          />
          <Route
              path="/confirm/:id"
              render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
          />
      </div>
    </Router>
  );
};

export default Controller;
