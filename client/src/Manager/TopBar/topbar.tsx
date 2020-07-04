/** @format */

import React from "react";
import Logo from "../../assets/chaathra.png";
import { SimpleAnchor } from "../../components/Anchors";
import {
  FlexBoxRowCenter,
  TopBarLogoBox,
  TopBarMainBox,
  UserMenuBox,
} from "../../components/Boxes";
import { TopBarLogo, Image } from "../../components/Images";
import userIcon from "../../assets/user.svg";
import arrowDown from "../../assets/arrow-down.svg";
function TopBar() {
  return (
    <FlexBoxRowCenter style={{ zIndex: 99999, position: "sticky", top: 0 }}>
      <TopBarMainBox>
        <TopBarLogoBox>
          <SimpleAnchor href='/manager/dashboard'>
            <TopBarLogo src={Logo} />
          </SimpleAnchor>
        </TopBarLogoBox>
        <UserMenuBox>
          <FlexBoxRowCenter style={{ cursor: "pointer" }}>
            <Image src={userIcon} />
            <Image src={arrowDown} />
          </FlexBoxRowCenter>
        </UserMenuBox>
      </TopBarMainBox>
    </FlexBoxRowCenter>
  );
}

export default TopBar;
