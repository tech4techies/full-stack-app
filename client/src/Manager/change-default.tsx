/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Box } from "../components/Boxes";
import { CardTitle, FormCard } from "../components/Cards";
import { Form, FormActions, FormInput, FrmErrs } from "../components/Forms";
import config from "../config";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Encrypt from "../utils-lib/encrypt";
import { IValidatorResult, Validator } from "../utils-lib/validators";
function ChangeDefault() {
  const [password, setPassword] = useState<null | string>(null);
  const [cnfPass, setCnfPass] = useState<null | string>(null);
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const [changed, setIsChanged] = useState<null | boolean>(null);
  const onChangePassword = (e: any) => {
    const { value } = e.target;
    setPassword(value);
  };
  const onChangeCnfPwd = (e: any) => {
    const { value } = e.target;
    setCnfPass(value);
  };
  const onSubmit = () => {
    const validErrs: IValidatorResult[] = [
      Validator.isRequired(password, "New Password"),
      Validator.isRequired(cnfPass, "Confirm Password"),
      Validator.equal(cnfPass, password, "Confirm Password", "New Password"),
      Validator.password(password, "New Password"),
    ].filter((val: IValidatorResult) => val.err);
    if (validErrs.length > 0) {
      setErrs(validErrs);
    } else {
      setErrs(null);
      const frmData = {
        password: password,
      };
      if (password && password.length > 0)
        frmData.password = Encrypt.hashPassword(password, config.secretKey);
      ajaxUtils.post("manager/changeDefault", frmData).then((res) => {
        if (res.type) setIsChanged(res.type);
      });
    }
  };
  return (
    <Box>
      {changed && <Redirect to='/manager/login' />}
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
export default ChangeDefault;
