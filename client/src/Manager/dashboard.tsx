/** @format */

import React, { useLayoutEffect, useState } from "react";
import { ContentPage, SimpleBox } from "../components/Boxes";
import { IMngrActivity } from "../types";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Activity from "./activity";
import Auth from "./auth";

function Dashboard() {
  const [activity, setActivity] = useState<null | IMngrActivity[] | []>(null);
  useLayoutEffect(() => {
    ajaxUtils.get("manager/activities").then((res: any) => {
      if (res) setActivity(res);
    });
  }, []);
  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          {activity && <Activity activity={activity}></Activity>}
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}

export default Dashboard;
