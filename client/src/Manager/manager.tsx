/** @format */

import React, { useCallback, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { SimpleBox } from "../components/Boxes";
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
  const [isMngrCookieValid, setIsMngr] = useState(false);
  const isCallMade = useRef(false);
  const validateCookie = useCallback(() => {
    if (!isCallMade.current)
      ajaxUtils.get("validate/cookie/manager").then((res) => {
        isCallMade.current = true;
        const { success, userType } = res;
        if (success && userType === "manager") {
          setIsMngr(true);
        } else if (success && userType !== "manager") {
          if (!isLoginPath) history.redirectTo("/manager/login");
        }
      });
  }, [isLoginPath]);

  return (
    <ValidateCookieCtx.Provider
      value={{
        refresh: validateCookie,
        isMngrCookieValid,
      }}>
      <SimpleBox>
        <Router>
          <Switch>
            <Route path='/manager/' exact>
              <Redirect to='/manager/login' />
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
      </SimpleBox>
    </ValidateCookieCtx.Provider>
  );
}

export default ManagerRouter;
