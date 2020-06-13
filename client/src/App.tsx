/** @format */

import React from "react";
import { SimpleBox } from "./components/Boxes";
import ExtraStyle from "./components/ExtraStyle";
import ManagerRouter from "./Manager/manager";
import NotFound from "./NotFound/not-found";
import SchoolRouter from "./School/school";
function App() {
  const {
    location: { pathname },
  } = window;
  const isSchool = /school/gi.test(pathname);
  const isManager = /manager/gi.test(pathname);
  return (
    <SimpleBox>
      <ExtraStyle />
      {isSchool && <SchoolRouter />}
      {isManager && <ManagerRouter />}
      {!isSchool && !isManager && <NotFound />}
    </SimpleBox>
  );
}

export default App;
