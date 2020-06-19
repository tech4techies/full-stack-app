/** @format */

import React, { useState } from "react";
import { Box, ContentPage } from "../components/Boxes";
import { CardTitle, ContentFrmCard } from "../components/Cards";
import { Form, FormInput, FrmErrs } from "../components/Forms";
import { IValidatorResult } from "../utils-lib/validators";
import Auth from "./auth";

interface IProps {}

function CreateManager(props: IProps) {
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [mobile, setMobile] = useState<null | string>(null);
  const [dob, setDob] = useState(new Date());
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const onChangeName = (e: any) => setName(e.target.value);
  const onChangeEmail = (e: any) => setEmail(e.target.value);
  const onChangeMobile = (e: any) => setMobile(e.target.value);
  const onChangeDOB = (e: any) => {
    const { value } = e.target;
    console.log("value ---", value);
    setDob(value);
  };
  return (
    <ContentPage>
      <Auth>
        <Box>
          <ContentFrmCard>
            <CardTitle>Add Details</CardTitle>
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
                  inputType={"date"}
                  onChange={onChangeDOB}
                  label={"Mobile"}
                  required={true}
                  autoComplete='off'
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
