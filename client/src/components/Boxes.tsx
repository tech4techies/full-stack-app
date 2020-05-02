/** @format */

import styled from "@emotion/styled";
import React from "react";
import { TextInput } from "./Inputs";

export const Box = styled.div({});
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

export const FormBox = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxSizing: "border-box",
  verticalAlign: "middle",
});

export const InputBox = styled.div({
  position: "relative",
  margin: 40,
});

interface FormInputProps {
  inputType: string;
  label: string;
  isRequired: boolean;
  onFocus: (e: any) => void;
  onChange: (e: any) => void;
}
export function FormInput(props: FormInputProps) {
  const { inputType, label, isRequired, onFocus, onChange } = props;
  const inputTypes = ["text", "email", "password", "number"];
  const isTextArea = inputTypes.indexOf(inputType) !== -1 ? false : true;
  return (
    <InputBox>
      <label>{label}</label>
      {!isTextArea && (
        <input
          type={inputType}
          onChange={onChange}
          onFocus={onFocus}
          required={isRequired}
        />
      )}
      {isTextArea && (
        <textarea
          onChange={onChange}
          onFocus={onFocus}
          required={isRequired}></textarea>
      )}
    </InputBox>
  );
}
