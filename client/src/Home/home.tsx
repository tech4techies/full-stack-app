/** @format */

import React from "react";
import { Box, FlexBoxRowCenter } from "../components/Boxes";
import { PrimaryButton } from "../components/Buttons";
import { CardTitle, SimpleCard } from "../components/Cards";
import history from "../utils-lib/history";

function Home() {
  const onAdminClick = () => {
    history.redirectTo("/manager");
  };
  const onSchoolClick = (e: any) => {
    history.redirectTo("/school");
  };

  return (
    <Box>
      <SimpleCard style={{ width: 400, marginLeft: "35%", marginTop: "10%" }}>
        <CardTitle style={{ textAlign: "center" }}>Welcome</CardTitle>
        <FlexBoxRowCenter style={{ marginLeft: "28%" }}>
          <Box>
            <PrimaryButton onClick={onAdminClick}>Admin</PrimaryButton>
          </Box>
          <Box>
            <PrimaryButton onClick={onSchoolClick}>School</PrimaryButton>
          </Box>
        </FlexBoxRowCenter>
      </SimpleCard>
    </Box>
  );
}

export default Home;
