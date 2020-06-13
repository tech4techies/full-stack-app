/** @format */

import styled from "@emotion/styled";

export const SimpleBox = styled.div({});

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

export const FrmErrBox = styled.div({
  color: "#f44336",
  textAlign: "left",
  padding: 5,
  backgroundColor: "#ffebee",
  borderRadius: 3,
  marginBottom: 5,
});

export const TopBarMainBox = styled.div({
  backgroundColor: "#fff",
  minWidth: "100%",
  maxWidth: "100%",
  position: "sticky",
  zIndex: 99999,
  top: 0,
  lineHeight: 1.15,
  display: "flex",
  alignItems: "center",
  fontSize: 14,
});

export const TopBarLogOutBox = styled.div({
  paddingTop: 6,
});

export const TopBarLogoBox = styled.div({
  width: 200,
  borderRight: "1px solid #dfe2e5",
  borderBottom: "1px solid #dfe2e5",
});

export const LeftBarMainBox = styled.div({
  fontSize: 14,
  lineHeight: 1.15,
  minWidth: 200,
  flexDirection: "column",
  backgroundColor: "white",
  display: "flex",
  borderRight: "1px solid #dfe2e5",
});

export const DashboardContentBox = styled.div({
  display: "flex",
  flex: "1 1 0%",
});
