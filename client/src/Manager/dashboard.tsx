/** @format */

import React, { useLayoutEffect, useState } from "react";
import { ContentBox, SimpleBox } from "../components/Boxes";
import { IMngrActivity } from "../types";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Activity from "./activity";
import Auth from "./auth";
import LeftBar from "./LeftBar/letbar";
import TopBar from "./TopBar/topbar";

function Dashboard() {
  const [isSuperAdmin, setIsSuperAdmin] = useState<null | boolean>(null);
  const [activity, setActivity] = useState<null | IMngrActivity[] | []>(null);
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
    ajaxUtils.get("/manager/activities").then((res) => {
      const { success, type, data } = res;
      if (success && type) setActivity(data);
    });
  }, []);
  return (
    <Auth>
      <SimpleBox>
        <TopBar />
        {isSuperAdmin !== null && (
          <ContentBox>
            <LeftBar isSuperAdmin={isSuperAdmin} />
            {activity && <Activity activity={activity}></Activity>}
          </ContentBox>
        )}
      </SimpleBox>
    </Auth>
  );
}

export default Dashboard;
