/** @format */

import React, { Fragment } from "react";
import {
  LeftBarListOption,
  LeftBarListOptionBox,
  LeftBarMainBox,
  LeftBarOptionsBox,
} from "../../components/Boxes";
import mngrLeftBarOptions from "./list";

interface ILeftBarProps {
  isSuperAdmin: boolean;
}
function LeftBar(props: ILeftBarProps) {
  const { isSuperAdmin } = props;
  console.log("isSuperAdmin ---", isSuperAdmin);
  let leftBarOptions: any[] = [];
  if (!isSuperAdmin)
    leftBarOptions = mngrLeftBarOptions.filter(
      (option) => !option.isSuperAdminType,
    );
  else leftBarOptions = mngrLeftBarOptions;
  return (
    <LeftBarMainBox>
      <LeftBarOptionsBox>
        {leftBarOptions.map((option, index) => {
          const { isListOption } = option;
          const isListType = isListOption ? true : false;
          if (isListType) {
            return (
              <LeftBarListOption
                key={index}
                options={option.options}
                label={option.mainLabel}
              />
            );
          } else {
            return <Fragment></Fragment>;
          }
        })}
      </LeftBarOptionsBox>
    </LeftBarMainBox>
  );
}
export default LeftBar;
