/** @format */

import React, { useState } from "react";
import { Box, FlexBoxRowCenter } from "../components/Boxes";
import { Captcha } from "../components/Captcha";
import { FormCard, CardTitle } from "../components/Cards";
// import { FormActions, FormInput, FrmErrs, Form } from "../components/Forms";
import { genCaptcha } from "../utils-lib/generate-captcha";
// import { Validator, IValidatorResult } from "../utils-lib/validators";
import { ajaxUtils } from "../utils-lib/axios-utils";
function MainLogin() {
  const [captcha, setCaptcha] = useState(btoa(genCaptcha(8)).replace("=", ""));
  const [schoolId, setSchoolId] = useState(null);
  const [userCapVal, setUserCapVal] = useState(null);
  // const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const onChangeSchoolId = (e: any) => {
    const { value } = e.target;
    setSchoolId(value);
  };
  // const onValidate = (errs: string[]) => setErrs(errs);
  const onChangeCaptcha = (e: any) => {
    const { value } = e.target;
    setUserCapVal(value);
  };
  const onSubmit = (e: any) => {
    // const validations: IValidatorResult[] = [
    // Validator.isRequired(schoolId, "School ID"),
    // Validator.equal(
    //   userCapVal,
    //   atob(captcha),
    //   "Captcha Value",
    //   "Generated Captcha"
    // ),
    // ];
    // const validErrs = validations.filter((val: IValidatorResult) => val.err);
    // if (validErrs.length > 0) {
    //   setErrs(validErrs);
    //   setCaptcha(btoa(genCaptcha(8)).replace("=", ""));
    // } else {
    //   setErrs(null);
    //   const frmData = {
    //     schoolId,
    //   };
    //   ajaxUtils.post("school/login", frmData).then((res) => {
    //     console.log("res ---", res);
    //   });
    // }
  };
  return (
    <Box>
      <FormCard>
        <CardTitle>School Login</CardTitle>
        {/* 
        {errs && <FrmErrs errs={errs} />}
        <Form>
          <Box>
            <FormInput
              inputType={"text"}
              onChange={onChangeSchoolId}
              label={"School ID"}
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
          </Box>
        </Form> */}
      </FormCard>
    </Box>
  );
}
export default MainLogin;
