/** @format */

import { createContext } from "react";
export const ValidateCookieCtx = createContext({
  refresh: () => {
    // donothing
  },
  isMngrCookieValid: false,
});
