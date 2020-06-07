/** @format */

import axios from "axios";
import notyUtils from "./noty-utils";
class AjaxUtils {
  async get(routeSuffix: string): Promise<any> {
    const { data, status } = await axios.get(`/sms/api/${routeSuffix}`, {
      withCredentials: true,
    });
    if (status === 200) {
      return data;
    } else {
      notyUtils.showFailed("Something went wrong");
      return {};
    }
  }
  async post(routeSuffix: string, frmData: any) {
    const { data, status } = await axios.post(
      `/sms/api/${routeSuffix}`,
      frmData,
      { withCredentials: true },
    );
    if (status === 200) {
      const { success, type, userMessage } = data;
      if (success && type && userMessage) notyUtils.showSuccess(userMessage);
      else if (success && !type && userMessage)
        notyUtils.showFailed(userMessage);
      return data;
    } else if (status === 500)
      notyUtils.showFailed(`Request Failed with ${status} status`);
  }
}
export const ajaxUtils = new AjaxUtils();
