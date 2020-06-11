/** @format */

import { createContext, useContext } from "react";
export const validateCookieCtx = createContext({
  refresh: () => {
    // donothing
  },
  isValid: false,
});
export function getReIndexContext() {
  return useContext(validateCookieCtx);
}
