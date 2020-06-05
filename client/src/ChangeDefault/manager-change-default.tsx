/** @format */

import React, { useState } from "react";
import { Box } from "../components/Boxes";
import { FormCard, CardTitle } from "../components/Cards";
import { Form, FormInput, FrmErrs, FormActions } from "../components/Forms";
import { IValidatorResult, Validator } from "../components/Validators";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Encrypt from "../utils-lib/encrypt";
import config from "../config";
function ManagerChangeDefault() {
  const [password, setPassword] = useState(null);
  const [cnfPass, setCnfPass] = useState(null);
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const onChangePassword = (e: any) => {
    const { value } = e.target;
    setPassword(value);
  };
  const onChangeCnfPwd = (e: any) => {
    const { value } = e.target;
    setCnfPass(value);
  };
  const onSubmit = () => {
    const validations: IValidatorResult[] = [
      Validator.isRequired(password, "New Password"),
      Validator.isRequired(cnfPass, "Confirm Password"),
      Validator.equal(cnfPass, password, "Confirm Password", "New Password"),
    ];
    const validErrs = validations.filter((val: IValidatorResult) => val.err);
    if (validErrs.length > 0) {
      setErrs(validErrs);
    } else {
      setErrs(null);
      const frmData = {
        password: password,
        isDefault: false,
      };
      ajaxUtils.post("manager/change-default", frmData).then((res) => {
        console.log("res ---", res);
      });
    }
  };
  return (
    <Box>
      <FormCard>
        <CardTitle>Change Password </CardTitle>
        {errs && <FrmErrs errs={errs} />}
        <Form>
          <Box>
            <FormInput
              inputType='password'
              onChange={onChangePassword}
              required={true}
              label={"New Password"}
              autoComplete={"off"}
            />
            <FormInput
              inputType='password'
              onChange={onChangeCnfPwd}
              required={true}
              label={"Confirm New Password"}
              autoComplete={"off"}
            />
            <FormActions
              onSubmit={{
                label: "Submit",
                onFrmSubmit: onSubmit,
              }}
            />
          </Box>
        </Form>
      </FormCard>
    </Box>
  );
}
export default ManagerChangeDefault;
