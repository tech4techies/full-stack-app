/** @format */

import React, { useState } from "react";
import { Box, ContentPage } from "../components/Boxes";
import { CardTitle, ContentFrmCard } from "../components/Cards";
import { Form, FormInput, FrmErrs, FormActions } from "../components/Forms";
import { IValidatorResult, Validator } from "../utils-lib/validators";
import Auth from "./auth";
import { CheckBox } from "../components/CheckBox";
import { ajaxUtils } from "../utils-lib/axios-utils";

interface IProps {}

function CreateManager(props: IProps) {
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [mobile, setMobile] = useState<null | string>(null);
  const [dob, setDob] = useState<null | string>(null);
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const [superAdmin, setSuperAdmin] = useState(false);
  const onChangeName = (e: any) => setName(e.target.value.trim());
  const onChangeEmail = (e: any) => setEmail(e.target.value.trim());
  const onChangeMobile = (e: any) => setMobile(e.target.value.trim());
  const onChangeDOB = (e: any) => setDob(e.target.value.trim());
  const onChangeSuperAdmin = (val: boolean) => setSuperAdmin(val);
  const onSubmit = (e: any) => {
    const requiredErrs: IValidatorResult[] = [
      Validator.isRequired(name, "Full Name"),
      Validator.isRequired(email, "Email"),
      Validator.isRequired(mobile, "Mobile"),
      Validator.isRequired(dob, "Date of Birth"),
    ].filter((validErr) => validErr.err);
    if (requiredErrs.length > 0) {
      setErrs(requiredErrs);
    } else {
      const validErrs: IValidatorResult[] = [
        Validator.email(email, "Email"),
        Validator.mobile(mobile, "Mobile"),
        Validator.date(dob, "Date of Birth"),
      ].filter((validErr) => validErr.err);
      if (validErrs.length > 0) setErrs(validErrs);
      else {
        setErrs(null);
        const data = {
          name,
          email,
          mobile,
          dob,
          isSuperAdmin: superAdmin,
        };
        ajaxUtils.post("/manager/createManager", { data });
      }
    }
  };
  return (
    <ContentPage>
      <Auth>
        <Box>
          <ContentFrmCard>
            <CardTitle>Fill Manager Details</CardTitle>
            <Form>
              <Box>
                {errs && <FrmErrs errs={errs} />}
                <FormInput
                  inputType={"text"}
                  onChange={onChangeName}
                  label={"Full Name"}
                  required={true}
                  autoComplete='off'
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeEmail}
                  label={"Email"}
                  required={true}
                  autoComplete='off'
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeMobile}
                  label={"Mobile"}
                  required={true}
                  autoComplete='off'
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeDOB}
                  label={"Date Of Birth (dd-mm-yyyy)"}
                  required={true}
                  autoComplete='off'
                />
                <CheckBox onClick={onChangeSuperAdmin} label={"Super Admin"} />
                <FormActions
                  onSubmit={{
                    label: "Submit",
                    onFrmSubmit: onSubmit,
                  }}
                />
              </Box>
            </Form>
          </ContentFrmCard>
        </Box>
      </Auth>
    </ContentPage>
  );
}

export default CreateManager;
