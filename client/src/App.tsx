/** @format */

import React from "react";
import { SimpleBox } from "./components/Boxes";
import ExtraStyle from "./components/ExtraStyle";
import ManagerRouter from "./Manager/manager";
import NotFound from "./NotFound/not-found";
import "nprogress/nprogress.css";
import SchoolRouter from "./School/school";
import getRouteType from "./utils-lib/routes";
function App() {
  const routeType = getRouteType();
  const isValidRoute = routeType === "school" || routeType === "manager";
  return (
    <SimpleBox>
      <ExtraStyle />
      {!isValidRoute && <NotFound />}
      {routeType === "manager" && isValidRoute && <ManagerRouter />}
      {routeType === "school" && isValidRoute && <SchoolRouter />}
    </SimpleBox>
  );
}

export default App;
