/** @format */

import axios from "axios";

class AjaxUtils {
  get(routeSuffix: string) {
    return axios.get(routeSuffix);
  }
  post(routeSuffix: string, data: any) {
    return axios.post(`${window.location.origin}/api/${routeSuffix}`, data);
  }
}
export const ajaxUtils = new AjaxUtils();
