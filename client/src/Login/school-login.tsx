/** @format */

import React, { useState } from "react";
import { Box, FlexBoxRowCenter, FormBox } from "../components/Boxes";
import { Captcha } from "../components/Captcha";
import { SchoolLoginCard } from "../components/Cards";
import { FormActions, FormInput, FrmErrs } from "../components/Forms";
import { genCaptcha } from "../utils-lib/generate-captcha";
import { Validator, IValidatorResult } from "../components/Validators";
function SchoolLogin() {
  const [captcha, setCaptcha] = useState(btoa(genCaptcha(8)).replace("=", ""));
  const [schoolId, setSchoolId] = useState("");
  const [userCapVal, setUserCapVal] = useState("");
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
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
    const validations: IValidatorResult[] = [
      Validator.isRequired(schoolId, "School ID"),
      Validator.equal(
        userCapVal,
        atob(captcha),
        "Captcha Value",
        "Generated Captcha",
      ),
    ];
    const validErrs = validations.filter((val: IValidatorResult) => val.err);
    if (validErrs.length > 0) {
      setErrs(validErrs);
      setCaptcha(btoa(genCaptcha(8)).replace("=", ""));
    } else setErrs(null);
  };
  return (
    <Box>
      <SchoolLoginCard>
        <h2>School Login</h2>
        <FormBox>
          {errs && <FrmErrs errs={errs} />}
          <FormInput
            inputType={"text"}
            onChange={onChangeSchoolId}
            label={"School ID"}
            name={"schoolId"}
            required={true}
          />
          <FlexBoxRowCenter>
            <Captcha value={captcha} />
            <FormInput
              style={{ top: 10, left: 10, paddingRight: 10 }}
              inputType={"text"}
              label={"Captcha"}
              name={"captcha"}
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
      </SchoolLoginCard>
    </Box>
  );
}
export default SchoolLogin;
