/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../NotFound/not-found";
import MainLogin from "./main-login";
function SchoolRouter() {
  return (
    <Router>
      <Switch>
        <Route path='/school/' exact>
          <MainLogin />
        </Route>
        <Route path='/school/login'>
          <MainLogin />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default SchoolRouter;
