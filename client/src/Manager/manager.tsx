/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ContentBox, SimpleBox } from "../components/Boxes";
import { ValidateCookieCtx } from "../context/manager";
import NotFound from "../NotFound/not-found";
import { IMngrProfile } from "../types";
import { ajaxUtils } from "../utils-lib/axios-utils";
import history from "../utils-lib/history";
import ChangeDefault from "./change-password";
import CreateManager from "./create-manager";
import Dashboard from "./dashboard";
import LeftBar from "./LeftBar/letbar";
import Login from "./login";
import TopBar from "./TopBar/topbar";
import DisableManager from "./disable-manager";
function ManagerRouter() {
  const {
    location: { pathname },
  } = window;
  const isLoginPath = /manager\/login/i.test(pathname);
  const [mngrProfile, setMngrProfile] = useState<null | IMngrProfile>(null);
  const [isMngrCookieValid, setIsMngr] = useState(false);
  const validateCookie = useCallback(async () => {
    const res = await ajaxUtils.get("validate/cookie/manager");
    if (res) {
      const { success, userType } = res;
      if (success && userType === "manager") setIsMngr(true);
      else if (success && userType !== "manager")
        if (!isLoginPath) history.redirectTo("/manager/login");
    }
  }, [isLoginPath]);

  useEffect(() => {
    if (isMngrCookieValid) {
      ajaxUtils.get("manager/profile").then((res) => {
        if (res) {
          const { success, type, data } = res;
          if (success && type) setMngrProfile(data);
        }
      });
    }
  }, [isMngrCookieValid]);
  return (
    <ValidateCookieCtx.Provider
      value={{
        refresh: validateCookie,
        isMngrCookieValid,
      }}>
      <SimpleBox>
        {!isMngrCookieValid && <Login />}
        <Router>
          {isMngrCookieValid && isLoginPath && (
            <Redirect to='/manager/dashboard' />
          )}
          {!isLoginPath && mngrProfile !== null && (
            <SimpleBox>
              <TopBar />
              <ContentBox>
                <LeftBar isSuperAdmin={mngrProfile.isSuperAdmin} />
                <Switch>
                  <Route path='/manager/dashboard'>
                    {mngrProfile !== null && <Dashboard />}
                  </Route>
                  <Route path='/manager/change-password'>
                    <ChangeDefault />
                  </Route>
                  <Route path='/manager/create-manager'>
                    <CreateManager />
                  </Route>
                  <Route path='/manager/disable-manager'>
                    <DisableManager />
                  </Route>
                  <Route path='*'>
                    <NotFound />
                  </Route>
                </Switch>
              </ContentBox>
            </SimpleBox>
          )}
        </Router>
      </SimpleBox>
    </ValidateCookieCtx.Provider>
  );
}

export default ManagerRouter;
