/** @format */

import axios from "axios";
import notyUtils from "./noty-utils";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import history from "./history";
import getRouteType from "./routes";
class AjaxUtils {
  async get(routeSuffix: string): Promise<any> {
    nprogress.start();
    try {
      const { data: body, status } = await axios.get(
        `/sms/api/${routeSuffix}`,
        {
          withCredentials: true,
        }
      );
      const { success, type, userMessage, data } = body;
      if (status === 404) return {};
      if (success && type && status === 200) {
        nprogress.done();
        return data;
      } else if (success && !type) {
        nprogress.done();
        notyUtils.showFailed(userMessage);
      } else {
        if (userMessage === "Login Required" && getRouteType() === "manager")
          history.redirectTo("/manager/login");
        else if (
          userMessage === "Login Required" &&
          getRouteType() === "school"
        )
          history.redirectTo("/home");
        nprogress.done();
        notyUtils.showFailed("Something went wrong");
      }
    } catch (err) {
      nprogress.done();
      notyUtils.showFailed("Request Failed!");
    }
  }
  async post(routeSuffix: string, frmData: any) {
    nprogress.start();
    try {
      const { data: body, status } = await axios.post(
        `/sms/api/${routeSuffix}`,
        frmData,
        { withCredentials: true }
      );
      if (status === 200) {
        const { success, type, userMessage, data } = body;
        if (success && type && userMessage) {
          nprogress.done();
          notyUtils.showSuccess(userMessage);
          return data;
        } else if (success && !type && userMessage) {
          nprogress.done();
          notyUtils.showFailed(userMessage);
          return data;
        } else if (success && type && !userMessage) {
          nprogress.done();
          return data;
        }
      } else {
        nprogress.done();
        notyUtils.showFailed("Something went wrong");
      }
    } catch (err) {
      nprogress.done();
      notyUtils.showFailed("Request Failed!");
    }
  }
}
export const ajaxUtils = new AjaxUtils();
