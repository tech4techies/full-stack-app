/** @format */

import React from "react";
import { SimpleBox } from "./components/Boxes";
import ExtraStyle from "./components/ExtraStyle";
import ManagerRouter from "./Manager/manager";
import NotFound from "./NotFound/not-found";
import "nprogress/nprogress.css";
import SchoolRouter from "./School/school";
function App() {
  const {
    location: { pathname },
  } = window;
  const isMngrRoute =
    /\/manager\/school\//gi.test(pathname) || /\/manager\//gi.test(pathname);
  const isSchoolRoute =
    /\/school\//gi.test(pathname) && !/\/manager\//gi.test(pathname);
  const isValidRoute = isSchoolRoute || isMngrRoute;
  return (
    <SimpleBox>
      <ExtraStyle />
      {!isValidRoute && <NotFound />}
      {isMngrRoute && isValidRoute && <ManagerRouter />}
      {isSchoolRoute && isValidRoute && <SchoolRouter />}
    </SimpleBox>
  );
}

export default App;
