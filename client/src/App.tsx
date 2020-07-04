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
  const isSchoolRoute = /\/school\//gi.test(pathname);
  const isMngrRoute = /\/manager\//gi.test(pathname);
  let isValidRoute = isSchoolRoute || isMngrRoute;
  isValidRoute = isSchoolRoute && isMngrRoute ? false : true;
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
