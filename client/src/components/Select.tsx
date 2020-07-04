/** @format */

import styled from "@emotion/styled";
import React from "react";
import { IOptions } from "../types";
import { SimpleBox } from "./Boxes";
import { RequiredSpan } from "./Inputs";

const StyledSelect = styled.select({
  color: "#000",
  padding: 10,
  borderRadius: 3,
  outline: "none",
  fontSize: 16,
  marginBottom: 20,
  width: "100%",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  border: "2px solid #9e9e9e",
});
const StyledOption = styled.option({});
interface IProps {
  required?: boolean;
  label: string;
  options: IOptions[];
  value?: string | number;
  onSelect: (val: string) => void;
}

export function Select(props: IProps) {
  const { label, options, value, required, onSelect } = props;
  return (
    <SimpleBox>
      {label}
      {required && <RequiredSpan>*</RequiredSpan>}
      <StyledSelect
        required={required}
        value={value}
        onChange={(e: any) => onSelect(e.target.value)}>
        <StyledOption value={""}>{`-- Select --`}</StyledOption>
        {options.map((option) => (
          <StyledOption key={option.value} value={option.value}>
            {option.label}
          </StyledOption>
        ))}
      </StyledSelect>
    </SimpleBox>
  );
}
