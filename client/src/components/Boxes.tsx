/** @format */

import styled from "@emotion/styled";
import React from "react";

export const Box = styled.div({
  padding: 5,
});
export const FlexBoxRow = styled.div({
  display: "flex",
  flexDirection: "row",
});
export const PageNotFoundBox = styled.div({
  fontSize: 20,
});
export const FlexBoxCol = styled.div({
  display: "flex",
  flexDirection: "column",
});
export const FourBox = styled.div({
  fontSize: 150,
  margin: 10,
});
export const FlexBoxRowCenter = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
export const FlexBoxColCenter = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const FormBox = styled.div({});

export const InputBox = styled.div({
  position: "relative",
});

export const CaptchaBox = styled.div({
  backgroundColor: "#f57c00",
  letterSpacing: 3,
  fontSize: 20,
  color: "#fff",
  fontWeight: 600,
  textDecoration: "line-through",
  textDecorationColor: "#f44336",
  textDecorationWidth: 10,
  padding: 10,
  width: "40%",
  textAlign: "center",
  pointerEvents: "none",
  userSelect: "none",
  textShadow: "1px 1px #f44336",
});
