/** @format */

import axios from "axios";

class AjaxUtils {
  get(routeSuffix: string) {
    return axios.get(`/sms/api/${routeSuffix}`);
  }
  post(routeSuffix: string, data: any) {
    return axios.post(`/sms/api/${routeSuffix}`, data);
  }
}
export const ajaxUtils = new AjaxUtils();
