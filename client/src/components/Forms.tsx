/** @format */

import React from "react";
import {
  Box,
  FlexBoxCol,
  FlexBoxRowCenter,
  FrmErrBox,
  InputBox,
  SimpleBox,
} from "./Boxes";
import { SubmitButton, BackButton } from "./Buttons";
import { InputLabel, StyledInput, StyledSpan, StyledTextArea } from "./Inputs";
import { IValidatorResult } from "../utils-lib/validators";

interface IFrmProps {
  children: React.ReactChild;
}

export function Form(props: IFrmProps) {
  const { children } = props;
  return <form onSubmit={(e) => e.preventDefault()}>{children}</form>;
}

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
  required: boolean;
  onKeyUp?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onChange?: (e: any) => void;
  style?: object;
  autoComplete?: string;
  autoCapitalize?: string;
  min?: string | number;
  max?: string | number;
  disbaled?: boolean;
  placeholder?: string;
  value?: string;
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
    autoComplete,
    autoCapitalize,
    disbaled,
    style,
    value,
    min,
    max,
    placeholder,
  } = props;
  const inputTypes = ["text", "password", "number"];
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
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          disabled={disbaled}
          min={min}
          placeholder={placeholder}
          value={value}
          max={max}
        />
      )}
      {isTextArea && (
        <StyledTextArea
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          disabled={disbaled}
          onKeyUp={onKeyUp}
          value={value}
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
    <SimpleBox>
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
    </SimpleBox>
  );
}
