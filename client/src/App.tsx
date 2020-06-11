/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ManagerChangeDefault from "./ChangeDefault/manager-change-default";
import { Box } from "./components/Boxes";
import ExtraStyle from "./components/ExtraStyle";
import ManagerDashboard from "./Dashboard/manager";
import Home from "./Home/home";
import NotFound from "./NotFound/not-found";
import SchoolRouter from "./School/school";
import ManagerRouter from "./Manager/manager";
function App() {
  const {
    location: { pathname },
  } = window;
  const isSchool = /school/gi.test(pathname);
  const isManager = /manager/gi.test(pathname);
  return (
    <Box>
      <ExtraStyle />
      {isSchool && <SchoolRouter />}
      {isManager && <ManagerRouter />}
      {!isSchool && !isManager && <NotFound />}
    </Box>
  );
}

export default App;
