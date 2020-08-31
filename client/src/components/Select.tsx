/** @format */

import styled from "@emotion/styled";
import React from "react";
import { Field } from "react-final-form";
import { FlexBoxCol, FrmBox } from "./Boxes";
import { ErrSpan, ReqSpan } from "./Span";
// import { RequiredSpan } from "./Inputs";

const StyledSelect = styled.select({
  color: "#000",
  padding: 5,
  borderRadius: 3,
  height: 35,
  outline: "none",
  fontSize: 14,
  width: "100%",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  border: "1px solid #9e9e9e",
});

interface IOption {
  label: string;
  value: any;
}

interface IProps {
  name: string;
  label: string;
  options: IOption[];
  required?: boolean;
  validators?: Array<any>;
}

const validate = (...validatorsArr: any) => (value: any) => {
  for (const validator of validatorsArr) {
    const err = validator(value);
    if (err) return err;
  }
};

const StyledLabel = styled.label({
  display: "block",
  fontSize: 14,
  paddingBottom: 2,
});

interface ISelectProps {
  options: IOption[];
  name: string;
  label: string;
  required?: boolean;
  onChange: (val: string) => void;
  validators?: Array<any>;
}
function Select(props: ISelectProps) {
  return (
    <Field
      name={props.name}
      validate={props.validators ? validate(...props.validators) : () => {}}
    >
      {({ input, meta }) => (
        <FlexBoxCol>
          <StyledLabel>
            {props.label} {props.required && <ReqSpan>*</ReqSpan>}
          </StyledLabel>
          <StyledSelect
            name={props.name}
            value={input.value}
            onChange={(e: any) => {
              const {
                target: { value },
              } = e;
              props.onChange(
                isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)
              );
            }}
          >
            <option value="">{`-- Select --`}</option>
            {props.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </FlexBoxCol>
      )}
    </Field>
  );
}

export default function FrmSelect(props: IProps) {
  return (
    <FrmBox>
      <Field
        name={props.name}
        validate={props.validators ? validate(...props.validators) : () => {}}
        component="select"
        options={props.options}
      >
        {({ input, meta, options }) => (
          <FlexBoxCol>
            <Select
              options={options}
              name={input.name}
              required={props.required}
              label={props.label}
              onChange={(value: string) => input.onChange(value)}
            />
            {meta.error && meta.touched && <ErrSpan>{meta.error}</ErrSpan>}
          </FlexBoxCol>
        )}
      </Field>
    </FrmBox>
  );
}
