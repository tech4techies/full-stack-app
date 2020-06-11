/** @format */

import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "../components/Boxes";
import { ValidateCookieCtx } from "../context/manager";
import NotFound from "../NotFound/not-found";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Dashboard from "./dashboard";
import Login from "./login";
function ManagerRouter() {
  const [isMngrCookieValid, setMngrValid] = useState(false);
  const validateCookie = useCallback(() => {
    ajaxUtils.get("validate/cookie/manager").then((res) => {
      const { success, userType } = res;
      if (success) setMngrValid(userType === "manager");
    });
  }, []);
  return (
    <ValidateCookieCtx.Provider
      value={{ refresh: validateCookie, isMngrCookieValid }}>
      <Box>
        <Router>
          <Switch>
            <Route path='/manager/' exact>
              <Login />
            </Route>
            <Route path='/manager/login'>
              <Login />
            </Route>
            <Route path='/manager/dashboard'>
              <Dashboard />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Box>
    </ValidateCookieCtx.Provider>
  );
}

export default ManagerRouter;
