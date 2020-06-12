/** @format */

import React, { useCallback, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "../components/Boxes";
import { ValidateCookieCtx } from "../context/manager";
import NotFound from "../NotFound/not-found";
import { ajaxUtils } from "../utils-lib/axios-utils";
import history from "../utils-lib/history";
import ChangeDefault from "./change-default";
import Dashboard from "./dashboard";
import Login from "./login";
function ManagerRouter() {
  const {
    location: { pathname },
  } = window;
  const isLoginPath = /manager\/login/gi.test(pathname);
  const [isMngrCookieValid, setMngrValid] = useState(false);
  const cookieCtx = useContext(ValidateCookieCtx);

  const validateCookie = useCallback(() => {
    ajaxUtils.get("validate/cookie/manager").then((res) => {
      const { success, userType } = res;
      if (
        success &&
        userType === "manager" &&
        !cookieCtx.isMngrCookieValid &&
        isLoginPath
      ) {
        setMngrValid(true);
        history.redirectTo("/manager/dashboard");
      } else if (
        success &&
        userType === "manager" &&
        !cookieCtx.isMngrCookieValid &&
        !isLoginPath
      ) {
        console.log("setting the state");
        setMngrValid(true);
      } else if (success && userType !== "manager") {
        if (!isLoginPath) history.redirectTo("/manager/login");
      }
    });
  }, []);

  return (
    <ValidateCookieCtx.Provider
      value={{
        refresh: validateCookie,
        isMngrCookieValid,
      }}>
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
            <Route path='/manager/change-default'>
              <ChangeDefault />
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
