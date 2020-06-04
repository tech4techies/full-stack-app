/** @format */

import axios from "axios";
import notyUtils from "./noty-utils";
import Noty from "noty";
class AjaxUtils {
  get(routeSuffix: string) {
    return axios.get(`/sms/api/${routeSuffix}`);
  }
  async post(routeSuffix: string, frmData: any) {
    const { data, status } = await axios.post(
      `/sms/api/${routeSuffix}`,
      frmData,
    );
    if (status === 200) {
      const { success, type, userMessage } = data;
      if (success && type && userMessage) notyUtils.showSuccess(userMessage);
      else if (success && !type && userMessage)
        notyUtils.showFailed(userMessage);
      return data;
    } else if (status === 500)
      notyUtils.show500Error(`Request Failed with ${status} status`);
    else if (status === 404) notyUtils.showInvalidReq("Invalid Request");
    else notyUtils.showBadRequest("Bad Request");
  }
}
export const ajaxUtils = new AjaxUtils();
