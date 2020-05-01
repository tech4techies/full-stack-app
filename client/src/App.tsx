/** @format */

import React, { useLayoutEffect } from "react";
import { Box } from "./components/Boxes";
import { instanceOf } from "prop-types";
import { useCookies, Cookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { ajaxUtils } from "./utils-lib/axios-utils";
import SchoolLogin from "./Login/school-login";
import NotFound from "./NotFound/not-found";
function App() {
  const cookies = new Cookies();
  useLayoutEffect(() => {
    const browserCookie = cookies.get("ch-user-id");
    if (!browserCookie) {
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route path='/login/school'>
          <SchoolLogin />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
