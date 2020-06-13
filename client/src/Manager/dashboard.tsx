/** @format */

import React from "react";
import {
  FlexBoxCol,
  FlexBoxRowCenter,
  DashboardContentBox,
  SimpleBox,
} from "../components/Boxes";
import Auth from "./auth";
import LeftBar from "./LeftBar/letbar";
import TopBar from "./TopBar/topbar";

function Dashboard() {
  return (
    <Auth>
      <SimpleBox>
        <TopBar />
        <DashboardContentBox>
          <LeftBar />
        </DashboardContentBox>
      </SimpleBox>
    </Auth>
  );
}

export default Dashboard;
