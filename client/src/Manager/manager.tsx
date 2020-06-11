/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../NotFound/not-found";
import Login from "./login";
function ManagerRouter() {
  return (
    <Router>
      <Switch>
        <Route path='/manager/' exact>
          <Login />
        </Route>
        <Route path='/manager/login'>
          <Login />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default ManagerRouter;
