/** @format */

import styled from "@emotion/styled";
import React from "react";
import { ILeftBarLinkOption } from "../types";
import { LeftBarListAnchor } from "./Anchors";

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
  fontSize: 16,
  borderBottom: "1px solid #dfe2e5",
});

export const TopBarLogoBox = styled.div({
  width: 200,
  borderRight: "1px solid #dfe2e5",
});

export const LeftBarMainBox = styled.div({
  fontSize: 16,
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
  fontSize: 16,
  lineHeight: 1.15,
});

export const ContentPage = styled.div({
  fontSize: 16,
  lineHeight: 1.15,
  maxWidth: 1000,
  margin: "10px auto",
});

export const FrmBox = styled.div({
  marginBottom: 10,
});

export const FrmFlexRowBox = styled(FlexBoxRowCenter)``;

export const LeftBarListOptionBox = styled.div({
  lineHeight: 1.15,
  marginBottom: 0,
  WebkitBoxAlign: "center",
  alignItems: "center",
  display: "flex",
  fontSize: 16,
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
  color: "#444444e3",
  fontSize: 16,
  flex: "1 1 0%",
});

export const UserMenuBox = styled.div({
  fontSize: 16,
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

export const ListOptionsBox = styled.div({
  fontSize: 16,
  lineHeight: 1.15,
  marginTop: 8,
});

interface IMenuOptionProps {
  label: string;
  options: ILeftBarLinkOption[];
  onClick: (val: string) => void;
  shouldOpen: boolean;
}
export function LeftBarListOption(props: IMenuOptionProps) {
  const { label, options, onClick, shouldOpen } = props;
  const onOptionClick = (e: any) => {
    const {
      target: { attributes },
    } = e;
    onClick(attributes["data-option"].nodeValue);
  };
  let boxStyle = {};
  if (shouldOpen)
    boxStyle = {
      borderRight: "2px solid #f9403a",
      backgroundColor: "#fdf0e7",
    };

  return (
    <SimpleBox data-option={label}>
      <LeftBarListOptionBox
        data-option={label}
        style={boxStyle}
        onClick={onOptionClick}
      >
        <LeftBarListOptionLabelBox
          data-option={label}
          style={shouldOpen ? { color: "#1e0b00" } : {}}
        >
          {label}
        </LeftBarListOptionLabelBox>
        <svg
          data-option={label}
          width="8"
          height="8"
          viewBox="0 0 7 4"
          onClick={onOptionClick}
          style={
            !shouldOpen
              ? {
                  transform: "rotate(-90deg)",
                  transition: "all 0.3s ease 0s",
                  marginRight: 4,
                }
              : {
                  transition: "all 0.3s ease 0s",
                  marginRight: 4,
                }
          }
        >
          <path
            data-option={label}
            fill="#354052"
            fillRule="evenodd"
            d="M3.852 3.684l-.018.014-.05.042a.492.492 0 0 1-.636-.056L.316.852A.504.504 0 0 1 .262.214L.318.146a.494.494 0 0 1 .705-.001L3.5 2.62 5.977.145A.504.504 0 0 1 6.614.09l.068.056a.494.494 0 0 1 .002.706L3.852 3.684z"
          ></path>
        </svg>
      </LeftBarListOptionBox>
      {shouldOpen && (
        <ListOptionsBox>
          {options.map((opt: ILeftBarLinkOption, idx: number) => (
            <LeftBarListAnchor key={idx} path={opt.path} label={opt.label} />
          ))}
        </ListOptionsBox>
      )}
    </SimpleBox>
  );
}
export const LeftBarOptionBox = styled.div({});
