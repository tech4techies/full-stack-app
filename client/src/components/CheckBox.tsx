/** @format */

import styled from "@emotion/styled";
import React, { useState } from "react";
import { FlexBoxRowCenter } from "./Boxes";

const BorderBox = styled.div({
  width: 16,
  height: 16,
  borderRadius: 3,
  cursor: "pointer",
  border: "2px solid #9e9e9e",
});

const TickMark = styled.div({
  marginLeft: 5,
  width: 5,
  border: "2px solid #fff",
  height: 10,
  transform: "rotate(45deg)",
  borderTop: "none",
  borderLeft: "none",
});

const BoxLabel = styled.label({
  marginLeft: 8,
  marginTop: 2,
  cursor: "pointer",
});

interface IProps {
  onClick: (val: boolean) => void;
  label: string;
}

export function CheckBox(props: IProps) {
  const [isChecked, setChecked] = useState(false);
  const onBoxClick = (e: any) => {
    setChecked(!isChecked);
    props.onClick(!isChecked);
  };
  return (
    <FlexBoxRowCenter style={{ padding: 3, marginBottom: 5 }}>
      <BorderBox
        onClick={onBoxClick}
        style={
          isChecked
            ? { borderColor: "#f97a20", backgroundColor: "#f97a20" }
            : {}
        }>
        {isChecked && <TickMark />}
      </BorderBox>
      <BoxLabel onClick={onBoxClick}>{props.label}</BoxLabel>
    </FlexBoxRowCenter>
  );
}
