/** @format */

import axios from "axios";

class AjaxUtils {
  constructor() {}
  get(routeSuffix: string) {
    return axios.get(routeSuffix);
  }
  post(routeSuffix: string) {
    return axios.post(`${window.location.origin}/api/${routeSuffix}`);
  }
}
export const ajaxUtils = new AjaxUtils();
