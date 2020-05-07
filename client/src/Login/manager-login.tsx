/** @format */

import React, { useState } from "react";
import { Box, FlexBoxRowCenter, FormBox } from "../components/Boxes";
import { Captcha } from "../components/Captcha";
import { LoginCard } from "../components/Cards";
import { FormActions, FormInput, FrmErrs } from "../components/Forms";
import { genCaptcha } from "../utils-lib/generate-captcha";
import { Validator, IValidatorResult } from "../components/Validators";
import { ajaxUtils } from "../utils-lib/axios-utils";
import crypto from "crypto";
import config from "../config";
import Encrypt from "../utils-lib/encrypt";

function ManagerLogin() {
  const [captcha, setCaptcha] = useState(btoa(genCaptcha(8)).replace("=", ""));
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [userCapVal, setUserCapVal] = useState("");
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const onChangeUsername = (e: any) => {
    const { value } = e.target;
    setUsername(value);
  };

  const onChangeCaptcha = (e: any) => {
    const { value } = e.target;
    setUserCapVal(value);
  };

  const onChangePassword = (e: any) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onSubmit = (e: any) => {
    const validations: IValidatorResult[] = [
      Validator.isRequired(userName, "Username"),
      Validator.equal(
        userCapVal,
        atob(captcha),
        "Captcha Value",
        "Generated Captcha",
      ),
      Validator.isRequired(password, "Password"),
    ];
    const validErrs = validations.filter((val: IValidatorResult) => val.err);
    if (validErrs.length > 0) {
      setErrs(validErrs);
      setCaptcha(btoa(genCaptcha(8)).replace("=", ""));
    } else {
      setErrs(null);
      const frmData = {
        userName,
        password: Encrypt.hashPassword(password, config.secretKey),
      };
      ajaxUtils.post("manager/login").then((res) => {
        console.log("res ---", res);
      });
    }
  };
  return (
    <Box>
      <LoginCard>
        <h2>Manager Login</h2>
        <FormBox>
          {errs && <FrmErrs errs={errs} />}
          <FormInput
            inputType={"text"}
            onChange={onChangeUsername}
            label={"Username"}
            required={true}
          />
          <FormInput
            inputType={"password"}
            onChange={onChangePassword}
            label={"Password"}
            required={true}
          />
          <FlexBoxRowCenter>
            <Captcha value={captcha} />
            <FormInput
              style={{ top: 10, left: 10, paddingRight: 10 }}
              inputType={"text"}
              label={"Captcha"}
              onChange={onChangeCaptcha}
              required={true}
            />
          </FlexBoxRowCenter>
          <FormActions
            onSubmit={{
              label: "Submit",
              onFrmSubmit: onSubmit,
            }}
          />
        </FormBox>
      </LoginCard>
    </Box>
  );
}
export default ManagerLogin;