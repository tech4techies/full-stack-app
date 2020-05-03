/** @format */

import React, { useState } from "react";
import { Captcha } from "../components/Captcha";
import { Box, FlexBoxRowCenter, FormBox } from "../components/Boxes";
import { SchoolLoginCard } from "../components/Cards";
import { FormActions, FormInput } from "../components/Forms";
import { genCaptcha } from "../utils-lib/generate-captcha";
function SchoolLogin() {
  const [schoolId, setSchoolId] = useState(null);
  const onChangeSchoolId = (e: any) => {
    const { value } = e.target;
    setSchoolId(value);
  };
  const [captcha, setCaptcha] = useState(btoa(genCaptcha(8)));
  return (
    <Box>
      <SchoolLoginCard>
        <h2>School Login</h2>
        <FormBox>
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
              required={true}
            />
          </FlexBoxRowCenter>
          <FormActions onSubmit={{ label: "Submit" }} />
        </FormBox>
      </SchoolLoginCard>
    </Box>
  );
}
export default SchoolLogin;
