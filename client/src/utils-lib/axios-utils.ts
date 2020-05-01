/** @format */

import axios from "axios";

class AjaxUtils {
  constructor() {}
  get(routeSuffix: string) {
    return axios.get(routeSuffix);
  }
}
export const ajaxUtils = new AjaxUtils();
