/** @format */

import styled from "@emotion/styled";
import React from "react";
import { Field } from "react-final-form";
import { ReqSpan, ErrSpan } from "./Span";
import { FlexBoxRowCenter, FrmBox, FlexBoxColCenter } from "./Boxes";

export const StyledInput = styled.input({
  color: "#000",
  padding: 10,
  borderRadius: 3,
  outline: "none",
  fontSize: 14,
  height: 35,
  fontFamily: "Roboto",
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #9e9e9e",
  transition: "all .3s ease",
});

export const InputLabel = styled.label({
  position: "absolute",
  top: -12,
  left: 0,
  marginTop: 20,
  pointerEvents: "none",
  fontSize: 14,
  marginLeft: 10,
  transition: "all 0.3s ease",
});

export const InputDateLabel = styled.label({
  display: "block",
  fontSize: 14,
});

export const InputBox = styled.div({
  position: "relative",
  width: "100%",
  marginBottom: 5,
});

interface IProps {
  name: string;
  type?: "number" | "text" | "password";
  label: string;
  validators?: Array<any>;
  required?: boolean;
  style?: Object;
}

const validate = (...validatorsArr: any) => (value: any) => {
  for (const validator of validatorsArr) {
    const err = validator(value);
    if (err) return err;
  }
};

export function FrmInput(props: IProps) {
  const parse = (val: string) => {
    if (props.type && props.type === "number")
      return isNaN(parseFloat(val)) ? val : parseFloat(val);
    else return val;
  };
  return (
    <FrmBox>
      <Field
        name={props.name}
        validate={props.validators ? validate(...props.validators) : () => {}}
        parse={parse}
      >
        {({ input, meta }) => (
          <FlexBoxRowCenter style={props.style}>
            <InputBox>
              <StyledInput
                {...input}
                type={props.type ? props.type : "text"}
                placeholder=" "
                autoComplete="off"
                min={props.type && props.type === "number" ? 0 : undefined}
                max={
                  props.type && props.type === "number" ? 9999999999 : undefined
                }
                spellCheck={false}
                {...props}
              />
              <InputLabel>
                {props.label}
                {props.required && <ReqSpan>*</ReqSpan>}
              </InputLabel>
              {meta.error && meta.touched && <ErrSpan>{meta.error}</ErrSpan>}
            </InputBox>
          </FlexBoxRowCenter>
        )}
      </Field>
    </FrmBox>
  );
}

export function FrmDateInput(props: IProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  return (
    <FrmBox>
      <Field
        name={props.name}
        validate={props.validators ? validate(...props.validators) : () => {}}
      >
        {({ input, meta }) => (
          <FlexBoxColCenter>
            <InputBox>
              <InputDateLabel>
                {props.label}
                {props.required && <ReqSpan>*</ReqSpan>}
              </InputDateLabel>
              <StyledInput
                {...input}
                type="date"
                placeholder=" "
                max={formatDate(new Date())}
                min={formatDate(new Date("01-01-1960"))}
                autoComplete="off"
                spellCheck={false}
                {...props}
              />
              {meta.error && meta.touched && <ErrSpan>{meta.error}</ErrSpan>}
            </InputBox>
          </FlexBoxColCenter>
        )}
      </Field>
    </FrmBox>
  );
}
