/** @format */

import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/relax.css";
class NotyUtils {
  showSuccess(text: string) {
    new Noty({
      theme: "relax",
      type: "success",
      text,
      layout: "topRight",
      timeout: 1500,
    }).show();
  }
  showFailed(text: string) {
    new Noty({
      theme: "relax",
      type: "error",
      text,
      layout: "topRight",
      timeout: 1500,
    }).show();
  }
}

const notyUtils = new NotyUtils();
export default notyUtils;
