/** @format */

import styled from "@emotion/styled";
import React, { useState, Fragment } from "react";
import { ILeftBarLinkOption } from "../types";

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
  borderBottom: "1px solid #dfe2e5",
});

export const TopBarLogoBox = styled.div({
  width: 200,
  borderRight: "1px solid #dfe2e5",
});

export const LeftBarMainBox = styled.div({
  fontSize: 14,
  lineHeight: 1.15,
  minWidth: 200,
  flexDirection: "column",
  backgroundColor: "white",
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  borderRight: "1px solid #dfe2e5",
});

export const ContentBox = styled.div({
  display: "flex",
  flex: "1 1 0%",
});

export const LeftBarOptionsBox = styled.div({
  fontSize: 14,
  lineHeight: 1.15,
});

export const ContentPage = styled.div({
  fontSize: 14,
  lineHeight: 1.15,
  maxWidth: 1000,
  margin: "10px auto",
});

export const LeftBarListOptionBox = styled.div({
  lineHeight: 1.15,
  marginBottom: 0,
  WebkitBoxAlign: "center",
  alignItems: "center",
  display: "flex",
  fontSize: 14,
  color: "#444444",
  cursor: "pointer",
  textDecoration: "none",
  paddingTop: 14,
  paddingRight: 9,
  paddingBottom: 14,
  paddingLeft: 18,
});

export const LeftBarListOptionLabelBox = styled.div({
  lineHeight: 1.15,
  color: "#444444",
  fontSize: 14,
  flex: "1 1 0%",
});

export const UserMenuBox = styled.div({
  fontSize: 14,
  lineHeight: 1.15,
  WebkitBoxAlign: "center",
  alignItems: "center",
  WebkitBoxPack: "end",
  position: "relative",
  display: "flex",
  justifyContent: "flex-end",
  flex: "1 1 0%",
  paddingRight: 30,
});

interface IMenuOptionProps {
  label: string;
  options: ILeftBarLinkOption[];
}
export function LeftBarListOption(props: IMenuOptionProps) {
  const { label } = props;
  const [isClicked, setIsClicked] = useState(false);
  const onOptionClick = () => {
    !isClicked ? setIsClicked(true) : setIsClicked(false);
  };
  let boxStyle = {};
  if (isClicked) {
    boxStyle = { borderRight: "2px solid #f9403a", backgroundColor: "#fdf0e7" };
  }
  return (
    <LeftBarListOptionBox style={boxStyle} onClick={onOptionClick}>
      <LeftBarListOptionLabelBox>{label}</LeftBarListOptionLabelBox>
      <svg
        width='8'
        height='8'
        viewBox='0 0 7 4'
        onClick={onOptionClick}
        style={
          !isClicked
            ? {
                transform: "rotate(-90deg)",
                transition: "all 0.3s ease 0s",
                marginRight: 4,
              }
            : {
                transition: "all 0.3s ease 0s",
                marginRight: 4,
              }
        }>
        <path
          fill='#354052'
          fillRule='evenodd'
          d='M3.852 3.684l-.018.014-.05.042a.492.492 0 0 1-.636-.056L.316.852A.504.504 0 0 1 .262.214L.318.146a.494.494 0 0 1 .705-.001L3.5 2.62 5.977.145A.504.504 0 0 1 6.614.09l.068.056a.494.494 0 0 1 .002.706L3.852 3.684z'></path>
      </svg>
    </LeftBarListOptionBox>
  );
}
export const LeftBarOptionBox = styled.div({});
