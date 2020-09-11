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
import Dashboard from "./dashboard";
import LeftBar from "./LeftBar/letbar";
import Login from "./login";
import CreateManager from "./ManagerServices/create-manager";
import EditMngrForm from "./ManagerServices/EditManager/edit-form";
import EditManager from "./ManagerServices/EditManager/edit-manager";
import EditSchool from "./SchoolServices/EditSchool/edit-school";
import CreateSchool from "./SchoolServices/create-school";
import TopBar from "./TopBar/topbar";
import EditSchoolFrm from "./SchoolServices/EditSchool/edit-form";
function ManagerRouter() {
  const {
    location: { pathname },
  } = window;
  const isLoginPath = /manager\/login/i.test(pathname);
  const [mngrProfile, setMngrProfile] = useState<null | IMngrProfile>(null);
  const [isMngrCookieValid, setIsMngr] = useState(false);
  const validateCookie = useCallback(async () => {
    const res = await ajaxUtils.get("validate/manager");
    if (res) {
      const { userType } = res;
      if (userType && userType === "manager") setIsMngr(true);
      else if (userType && userType !== "manager") {
        if (!isLoginPath) history.redirectTo("/manager/login");
      } else {
        if (!isLoginPath) history.redirectTo("/manager/login");
      }
    }
  }, [isLoginPath]);

  useEffect(() => {
    if (isMngrCookieValid) {
      ajaxUtils.get("manager/profile").then((res) => {
        if (res) setMngrProfile(res);
      });
    }
  }, [isMngrCookieValid]);
  return (
    <ValidateCookieCtx.Provider
      value={{
        refresh: validateCookie,
        isMngrCookieValid,
      }}
    >
      <SimpleBox>
        {!isMngrCookieValid && <Login />}
        <Router>
          {isMngrCookieValid && isLoginPath && (
            <Redirect to="/manager/dashboard" />
          )}
          {!isLoginPath && mngrProfile !== null && (
            <SimpleBox>
              <TopBar />
              <ContentBox>
                <LeftBar isSuperAdmin={mngrProfile.isSuperAdmin} />
                <Switch>
                  <Route path="/manager/dashboard">
                    {mngrProfile !== null && <Dashboard />}
                  </Route>
                  <Route path="/manager/changePassword">
                    <ChangeDefault />
                  </Route>
                  <Route path="/manager/create">
                    <CreateManager />
                  </Route>
                  <Route path="/manager/edit" exact>
                    <EditManager />
                  </Route>
                  <Route path="/manager/edit/:email" exact>
                    <EditMngrForm />
                  </Route>
                  <Route path="/manager/school/create">
                    <CreateSchool />
                  </Route>
                  <Route path="/manager/school/edit">
                    <EditSchool />
                  </Route>
                  <Route path="/manager/school/edit:id">
                    <EditSchoolFrm />
                  </Route>
                  <Route path="*">
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
