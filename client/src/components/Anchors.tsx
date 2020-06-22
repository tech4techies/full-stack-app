/** @format */

import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { FlexBoxRow } from "./Boxes";
export const SimpleAnchor = styled.a({});

export const Anchor = styled.a({
  textDecoration: "none",
  color: "#000",
});

interface ILeftBarListAnchorProps {
  label: string;
  path: string;
}

export function LeftBarListAnchor(props: ILeftBarListAnchorProps) {
  return (
    <FlexBoxRow style={{ marginLeft: 22 }}>
      <Link
        style={{
          textDecoration: "none",
          width: "100%",
          color: "#2b1f17",
          padding: 8,
          borderLeft: "2px solid rgba(128, 128, 128, 0.33)",
        }}
        to={props.path}>
        {props.label}
      </Link>
    </FlexBoxRow>
  );
}
