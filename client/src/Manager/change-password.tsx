/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, ContentPage } from "../components/Boxes";
import { CardTitle, FormCard } from "../components/Cards";
import { Form, FormActions, FormInput, FrmErrs } from "../components/Forms";
import config from "../config";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Encrypt from "../utils-lib/encrypt";
import { IValidatorResult, Validator } from "../utils-lib/validators";
import Auth from "./auth";
import history from "../utils-lib/history";
function ChangeDefault() {
  const [password, setPassword] = useState<null | string>(null);
  const [cnfPass, setCnfPass] = useState<null | string>(null);
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
      ajaxUtils.post("manager/changePassword", frmData).then((res) => {
        if (res && res.type) history.redirectTo("/manager/login");
      });
    }
  };
  return (
    <ContentPage>
      <Auth>
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
      </Auth>
    </ContentPage>
  );
}
export default ChangeDefault;
