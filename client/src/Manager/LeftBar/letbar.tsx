/** @format */

import React, { Fragment } from "react";
import {
  LeftBarListOption,
  LeftBarMainBox,
  LeftBarOptionsBox,
} from "../../components/Boxes";
import mngrLeftBarOptions from "./list";
import { ILeftBarLinkOption } from "../../types";

interface ILeftBarProps {
  isSuperAdmin: boolean;
}
function LeftBar(props: ILeftBarProps) {
  const { isSuperAdmin } = props;
  let leftBarOptions: any[] = [];
  if (!isSuperAdmin) {
    leftBarOptions = mngrLeftBarOptions.filter(
      (option) => !option.isSuperAdminType,
    );
    leftBarOptions.filter((leftBarOpt) => {
      const { options } = leftBarOpt;
      if (options) {
        leftBarOpt.options = options.filter(
          (opt: ILeftBarLinkOption) => !opt.isSuperAdminType,
        );
        return null;
      } else return null;
    });
  } else leftBarOptions = mngrLeftBarOptions;
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
