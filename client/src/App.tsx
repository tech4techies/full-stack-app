/** @format */

import React, { useLayoutEffect } from "react";
import { Box } from "./components/Boxes";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
function App() {
  useLayoutEffect(() => {}, []);
  return (
    <Router>
      <Box></Box>
    </Router>
  );
}

export default App;
