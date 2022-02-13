import React from "react";
import Home from "../common/header/Header";
import BookShow from "./bookshow/BookShow";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = () => {
  const baseUrl = "http://localhost:8085/api/v1/";

  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
          <Route
              path="/bookshow/:id"
              render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
          />

      </div>
    </Router>
  );
};

export default Controller;
