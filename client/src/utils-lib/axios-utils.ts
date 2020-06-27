/** @format */

import axios from "axios";
import notyUtils from "./noty-utils";
class AjaxUtils {
  async get(routeSuffix: string): Promise<any> {
    try {
      const { data, status } = await axios.get(`/sms/api/${routeSuffix}`, {
        withCredentials: true,
      });
      const { success, type, userMessage } = data;
      if (success && type && status === 200) {
        return data;
      } else if (success && !type) {
        notyUtils.showFailed(userMessage);
      } else {
        notyUtils.showFailed("Something went wrong");
        return {};
      }
    } catch (err) {
      notyUtils.showFailed("Request Failed!");
    }
  }
  async post(routeSuffix: string, frmData: any) {
    try {
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
      } else notyUtils.showFailed("Something went wrong");
    } catch (err) {
      notyUtils.showFailed("Request Failed!");
    }
  }
}
export const ajaxUtils = new AjaxUtils();
