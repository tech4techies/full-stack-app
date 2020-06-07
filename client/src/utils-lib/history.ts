/** @format */

import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
class History {
  redirectTo(path: string) {
    browserHistory.push(path);
    window.location.reload();
  }
}

const history = new History();
export default history;
