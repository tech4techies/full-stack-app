/** @format */

import React from "react";
import {
  LeftBarMainBox,
  LeftBarListOption,
  LeftBarListOptionBox,
  LeftBarOptionsBox,
} from "../../components/Boxes";

interface ILeftBarProps {
  isSuperAdmin: boolean;
}
function LeftBar(props: ILeftBarProps) {
  const { isSuperAdmin } = props;
  return (
    <LeftBarMainBox>
      <LeftBarOptionsBox>
        <LeftBarListOptionBox>
          <LeftBarListOption label={"Manager Services"} />
        </LeftBarListOptionBox>
        <LeftBarListOptionBox>
          <LeftBarListOption label={"School Services"} />
        </LeftBarListOptionBox>
      </LeftBarOptionsBox>
    </LeftBarMainBox>
  );
}
export default LeftBar;
