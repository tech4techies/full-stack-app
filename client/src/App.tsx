/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ManagerChangeDefault from "./ChangeDefault/manager-change-default";
import { Box } from "./components/Boxes";
import ExtraStyle from "./components/ExtraStyle";
import ManagerDashboard from "./Dashboard/manager";
import Home from "./Home/home";
import ManagerLogin from "./Login/manager-login";
import SchoolLogin from "./Login/school-login";
import NotFound from "./NotFound/not-found";
function App() {
  return (
    <Box>
      <Router>
        <ExtraStyle />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/school/login'>
            <SchoolLogin />
          </Route>
          <Route path='/manager/login'>
            <ManagerLogin />
          </Route>
          <Route path='/manager/change-default'>
            <ManagerChangeDefault />
          </Route>
          <Route path='/manager/dashboard'>
            <ManagerDashboard />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
