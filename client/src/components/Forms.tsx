/** @format */

import React from "react";
import { InputBox, Box, FlexBoxRow, FlexBoxRowCenter } from "./Boxes";
import { StyledInput, StyledTextArea, InputLabel, StyledSpan } from "./Inputs";
import { SubmitButton } from "./Buttons";

interface FormInputProps {
  inputType: string;
  label: string;
  required: boolean;
  onKeyUp?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  style?: object;
}
export function FormInput(props: FormInputProps) {
  const {
    inputType,
    label,
    required,
    onKeyUp,
    onKeyDown,
    onKeyPress,
    onFocus,
    onChange,
    style,
  } = props;
  const inputTypes = ["text", "email", "password", "number"];
  const isTextArea = inputTypes.indexOf(inputType) !== -1 ? false : true;
  const inlineStyle = style ? style : {};
  return (
    <InputBox style={inlineStyle}>
      {!isTextArea && (
        <StyledInput
          type={inputType}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          required={required}
        />
      )}
      {isTextArea && (
        <StyledTextArea
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          required={required}></StyledTextArea>
      )}
      {required && (
        <InputLabel>
          {label}
          <StyledSpan>*</StyledSpan>
        </InputLabel>
      )}
      {!required && <InputLabel>{label}</InputLabel>}
    </InputBox>
  );
}

const ArrowRight = require("../assets/right-arrow.svg");

interface IonSubmit {
  label: string;
}
interface IFormActionsProps {
  onSubmit: IonSubmit;
  onGoBack?: string;
}
export function FormActions(props: IFormActionsProps) {
  const onSubmit = (e: any) => {
    console.log("submitted");
  };
  return (
    <Box>
      <SubmitButton onClick={onSubmit}>
        <FlexBoxRowCenter>
          <img src={ArrowRight} />
          Submit
        </FlexBoxRowCenter>
      </SubmitButton>
    </Box>
  );
}
