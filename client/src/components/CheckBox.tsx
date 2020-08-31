import React from "react";
import { Field } from "react-final-form";

interface IProps {
  name: string;
  label: string;
}

export default function FrmCheckBox(props: IProps) {
  return (
    <div className="ch-checkbox-group">
      <label className="ch-checkbox-label">
        <Field
          className={"ch-checkbox"}
          name={props.name}
          component="input"
          type="checkbox"
        />
        {props.label}
      </label>
    </div>
  );
}
