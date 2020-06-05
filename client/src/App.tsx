/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExtraStyle from "./components/ExtraStyle";
import SchoolLogin from "./Login/school-login";
import NotFound from "./NotFound/not-found";
import ManagerLogin from "./Login/manager-login";
import ManagerChangeDefault from "./ChangeDefault/manager-change-default";
function App() {
  return (
    <Router>
      <ExtraStyle />
      <Switch>
        <Route path='/school/login'>
          <SchoolLogin />
        </Route>
        <Route path='/manager/login'>
          <ManagerLogin />
        </Route>
        <Route path='/manager/change-default'>
          <ManagerChangeDefault />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
