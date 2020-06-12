/** @format */

import React, { useLayoutEffect, useContext } from "react";
import { ValidateCookieCtx } from "../context/manager";
import { Box } from "../components/Boxes";

interface IProps {
  children: React.ReactChild;
}
function Auth(props: IProps) {
  const { children } = props;
  const cookieCtx = useContext(ValidateCookieCtx);
  const {
    location: { pathname },
  } = window;
  const isLoginPath = /manager\/login/gi.test(pathname);
  useLayoutEffect(() => {
    cookieCtx.refresh();
  }, []);
  return (
    <Box>
      {!cookieCtx.isMngrCookieValid && !isLoginPath && <Box>Loading....</Box>}
      {(cookieCtx.isMngrCookieValid || isLoginPath) && children}
    </Box>
  );
}

export default Auth;
