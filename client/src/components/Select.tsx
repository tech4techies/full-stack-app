/** @format */

import styled from "@emotion/styled";
import React from "react";
import { IOptions } from "../types";

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
  label: string;
  options: IOptions[];
  value?: string | number;
  onSelect: (val: string) => void;
}

export function Select(props: IProps) {
  const { label, options, value, onSelect } = props;
  return (
    <StyledSelect value={value} onChange={(e: any) => onSelect(e.target.value)}>
      <StyledOption value={""} disabled>
        {label}
      </StyledOption>
      {options.map((option) => (
        <StyledOption key={option.value} value={option.value}>
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}
