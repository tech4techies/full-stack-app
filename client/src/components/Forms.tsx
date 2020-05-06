/** @format */

import React from "react";
import {
  Box,
  FlexBoxCol,
  FlexBoxRowCenter,
  FrmErrBox,
  InputBox,
} from "./Boxes";
import { SubmitButton, BackButton } from "./Buttons";
import { InputLabel, StyledInput, StyledSpan, StyledTextArea } from "./Inputs";
import { IValidatorResult } from "./Validators";

interface IFrmErrsProps {
  errs: IValidatorResult[];
}
export function FrmErrs(props: IFrmErrsProps) {
  const { errs } = props;
  return (
    <FlexBoxCol style={{ marginBottom: 3 }}>
      {errs.map((err, index) => (
        <FrmErrBox key={err.errMessage}>{err.errMessage}</FrmErrBox>
      ))}
    </FlexBoxCol>
  );
}

interface FormInputProps {
  inputType: string;
  label: string;
  name: string;
  required: boolean;
  onKeyUp?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onChange?: (e: any) => void;
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
    name,
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
          name={name}
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
          name={name}
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
const ArrowLeft = require("../assets/left-arrow.svg");

interface IOnSubmit {
  label: string;
  onFrmSubmit: (e: any) => void;
}
interface IOnGoBack {
  label: string;
  onFrmGoBack: (e: any) => void;
}
interface IFormActionsProps {
  onSubmit: IOnSubmit;
  onGoBack?: IOnGoBack;
}
export function FormActions(props: IFormActionsProps) {
  const { onSubmit, onGoBack } = props;

  const { label, onFrmSubmit } = onSubmit;
  return (
    <Box style={{ padding: 0 }}>
      <FlexBoxRowCenter>
        <Box style={{ marginRight: "40%" }}>
          <SubmitButton onClick={onFrmSubmit}>
            <FlexBoxRowCenter>
              <img alt={"Arrow-Right"} src={ArrowRight} />
              {label}
            </FlexBoxRowCenter>
          </SubmitButton>
        </Box>
        {onGoBack && (
          <BackButton>
            <FlexBoxRowCenter>
              <img alt={"Arrow-Left"} src={ArrowLeft} />
              {onGoBack.label}
            </FlexBoxRowCenter>
          </BackButton>
        )}
      </FlexBoxRowCenter>
    </Box>
  );
}
