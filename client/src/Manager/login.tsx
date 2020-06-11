/** @format */

import React, { useContext, useLayoutEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, FlexBoxRowCenter } from "../components/Boxes";
import { Captcha } from "../components/Captcha";
import { CardTitle, FormCard } from "../components/Cards";
import { Form, FormActions, FormInput, FrmErrs } from "../components/Forms";
import config from "../config";
import { ValidateCookieCtx } from "../context/manager";
import { ajaxUtils } from "../utils-lib/axios-utils";
import Encrypt from "../utils-lib/encrypt";
import { genCaptcha } from "../utils-lib/generate-captcha";
import { IValidatorResult, Validator } from "../utils-lib/validators";
function Login() {
  const [captcha, setCaptcha] = useState(btoa(genCaptcha(8)).replace("=", ""));
  const [userName, setUsername] = useState(null);
  const cookieCtx = useContext(ValidateCookieCtx);
  const [password, setPassword] = useState("");
  const [userCapVal, setUserCapVal] = useState("");
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const [isDefault, setIsDefault] = useState<null | boolean>(null);

  useLayoutEffect(() => {
    cookieCtx.refresh();
  }, [cookieCtx]);
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
    const validErrs: IValidatorResult[] = [
      Validator.isRequired(userName, "Username"),
      Validator.isRequired(password, "Password"),
      Validator.equal(
        userCapVal,
        atob(captcha),
        "Captcha Value",
        "Generated Captcha",
      ),
    ].filter((val: IValidatorResult) => val.err);
    if (validErrs.length > 0) {
      setErrs(validErrs);
      setCaptcha(btoa(genCaptcha(8)).replace("=", ""));
    } else {
      setErrs(null);
      const frmData = {
        userName,
        password: Encrypt.hashPassword(password, config.secretKey),
      };
      ajaxUtils.post("manager/login", frmData).then((res) => {
        setIsDefault(res.isDefault);
        cookieCtx.refresh();
      });
    }
  };
  return (
    <Box>
      {isDefault && cookieCtx.isMngrCookieValid && (
        <Redirect to='/manager/change-default' />
      )}
      {!isDefault && cookieCtx.isMngrCookieValid && (
        <Redirect to='/manager/dashboard' />
      )}
      <FormCard>
        <CardTitle>Manager Login</CardTitle>
        <Form>
          <Box>
            {errs && <FrmErrs errs={errs} />}
            <FormInput
              inputType={"text"}
              onChange={onChangeUsername}
              label={"Username"}
              required={true}
              autoComplete='off'
            />
            <FormInput
              inputType={"password"}
              onChange={onChangePassword}
              label={"Password"}
              required={true}
              autoComplete='off'
            />
            <FlexBoxRowCenter>
              <Captcha value={captcha} />
              <FormInput
                style={{ top: 10, left: 10, paddingRight: 10 }}
                inputType={"text"}
                label={"Captcha"}
                onChange={onChangeCaptcha}
                required={true}
                autoComplete='off'
              />
            </FlexBoxRowCenter>
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
export default Login;
