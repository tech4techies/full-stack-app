/** @format */

import React from "react";
import { SimpleBox } from "../components/Boxes";
import { CardTitle, SimpleCard } from "../components/Cards";
import SimpleTable from "../components/Table";
import { IMngrActivity } from "../types";

interface IProps {
  activity: IMngrActivity[];
}
export default function Activity(props: IProps) {
  const { activity } = props;
  const headings = ["Activity", "Browser", "System", "Created At"];
  activity.forEach((act: IMngrActivity) => {
    const { iAt } = act;
    act.iAt = iAt.replace("T", " ").slice(0, -5);
  });
  return (
    <SimpleCard>
      <CardTitle style={{ paddingLeft: 10 }}>Your Activity</CardTitle>
      {activity.length > 0 && (
        <SimpleBox>
          <SimpleTable headings={headings} data={activity} />
        </SimpleBox>
      )}
      {activity.length === 0 && (
        <SimpleBox style={{ padding: 10 }}>No Activity Found Today.</SimpleBox>
      )}
    </SimpleCard>
  );
}
