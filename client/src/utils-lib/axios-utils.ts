/** @format */

import axios from "axios";

class AjaxUtils {
  constructor() {}
  get(routeSuffix: string) {
    return axios.get(routeSuffix);
  }
  post(routeSuffix: string) {}
}
export const ajaxUtils = new AjaxUtils();
