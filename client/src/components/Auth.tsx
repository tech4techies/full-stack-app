/** @format */

import React, { useContext, useLayoutEffect, useState } from "react";
import { ValidateCookieCtx } from "../context/manager";
import history from "../utils-lib/history";
import { Box } from "./Boxes";

interface IAuthProps {
  children: React.ReactChild;
}

export default function Auth(props: IAuthProps) {
  const { children } = props;
  const cookieCtx = useContext(ValidateCookieCtx);
  const [isAuth, setIsAuth] = useState<null | boolean>(null);
  const {
    location: { pathname },
  } = window;
  const isLoginPath = /manager\/login/gi.test(pathname);
  useLayoutEffect(() => {
    cookieCtx.refresh();
    setIsAuth(cookieCtx.isMngrCookieValid);
    if (!cookieCtx.isMngrCookieValid && !isLoginPath) {
      history.redirectTo("/manager/login");
    }
  }, [isLoginPath, cookieCtx]);
  return (
    <Box>
      {isAuth === null && <Box>Loading... </Box>}
      {(isAuth || isLoginPath) && children}
    </Box>
  );
}
