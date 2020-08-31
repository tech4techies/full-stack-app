/** @format */

import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
class History {
  pageReload() {
    window.location.reload();
  }
  redirectTo(path: string) {
    browserHistory.push(path);
    this.pageReload();
  }
  goBack() {
    browserHistory.goBack();
  }
  pageWaitRefresh() {
    setTimeout(() => {
      history.pageReload();
    }, 500);
  }
}
const history = new History();
export default history;
