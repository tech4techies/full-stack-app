/** @format */

import React, { useLayoutEffect, useState } from "react";
import {
  FlexBoxCol,
  FlexBoxRowCenter,
  DashboardContentBox,
  SimpleBox,
} from "../components/Boxes";
import Auth from "./auth";
import LeftBar from "./LeftBar/letbar";
import TopBar from "./TopBar/topbar";
import { ajaxUtils } from "../utils-lib/axios-utils";

function Dashboard() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  useLayoutEffect(() => {
    ajaxUtils.get("manager/profile").then((res) => {
      if (res) {
        const { success, type, data } = res;
        if (success && type) {
          const { isSuperAdmin } = data;
          setIsSuperAdmin(isSuperAdmin);
        }
      }
    });
  }, []);
  return (
    <Auth>
      <SimpleBox>
        <TopBar />
        <DashboardContentBox>
          <LeftBar isSuperAdmin={isSuperAdmin} />
          Content Comes Here....
        </DashboardContentBox>
      </SimpleBox>
    </Auth>
  );
}

export default Dashboard;
