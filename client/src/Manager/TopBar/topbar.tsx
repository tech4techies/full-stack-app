/** @format */

import React from "react";
import Logo from "../../assets/chaathra.png";
import { Anchor, SimpleAnchor } from "../../components/Anchors";
import {
  FlexBoxRowCenter,
  TopBarLogoBox,
  TopBarLogOutBox,
  TopBarMainBox,
} from "../../components/Boxes";
import { TopBarLogo } from "../../components/Images";

function TopBar() {
  return (
    <FlexBoxRowCenter style={{ zIndex: 99999 }}>
      <TopBarMainBox>
        <TopBarLogoBox>
          <SimpleAnchor href='/manager/dashboard'>
            <TopBarLogo src={Logo} />
          </SimpleAnchor>
        </TopBarLogoBox>
        <TopBarLogOutBox>
          <Anchor href='/manager/logout' style={{ paddingTop: 5 }}>
            Logout
          </Anchor>
        </TopBarLogOutBox>
      </TopBarMainBox>
    </FlexBoxRowCenter>
  );
}

export default TopBar;
