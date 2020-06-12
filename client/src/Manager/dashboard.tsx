/** @format */

import React from "react";
import { Box } from "../components/Boxes";
import Auth from "./auth";

function Dashboard() {
  return (
    <Auth>
      <Box>In Manager Dashboard</Box>
    </Auth>
  );
}

export default Dashboard;
