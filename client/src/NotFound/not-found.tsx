/** @format */

import React from "react";
import notFoundEmoji from "../assets/not-found-emoji.png";
import {
  Box,
  FlexBoxColCenter,
  FlexBoxRowCenter,
  FourBox,
  PageNotFoundBox,
} from "../components/Boxes";
import { PrimaryButton } from "../components/Buttons";
import { Image } from "../components/Images";

function NotFound() {
  return (
    <FlexBoxColCenter>
      <FlexBoxRowCenter>
        <FourBox>4</FourBox>
        <Image src={notFoundEmoji} />
        <FourBox>4</FourBox>
      </FlexBoxRowCenter>
      <PageNotFoundBox>OOPS!! LOST SOMEWHERE.. PAGE NOT FOUND</PageNotFoundBox>
      <Box>
        <PrimaryButton>Back to Login</PrimaryButton>
      </Box>
    </FlexBoxColCenter>
  );
}
export default NotFound;
