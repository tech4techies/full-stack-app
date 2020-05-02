/** @format */

import React, { useLayoutEffect } from "react";
import { Cookies } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchoolLogin from "./Login/school-login";
import NotFound from "./NotFound/not-found";
import ExtraStyle from "./components/ExtraStyle";
function App() {
  const cookies = new Cookies();
  useLayoutEffect(() => {
    const browserCookie = cookies.get("ch-user-id");
    if (!browserCookie) {
    }
  }, []);
  return (
    <Router>
      <ExtraStyle />
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
