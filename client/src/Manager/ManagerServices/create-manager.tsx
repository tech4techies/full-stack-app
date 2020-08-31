/** @format */

import React from "react";
import { Box, ContentPage, SimpleBox } from "../../components/Boxes";
import { CardTitle, ContentCard } from "../../components/Cards";
import FrmCheckBox from "../../components/CheckBox";
import { Frm } from "../../components/Forms";
import { FrmInput, FrmDateInput } from "../../components/Inputs";
import FrmSelect from "../../components/Select";
import { date, email, mobile, required } from "../../utils-lib/validators";
import Auth from "../auth";
import { genderOpts } from "../options";

function CreateManager() {
  return (
    <ContentPage>
      <Auth>
        <Box>
          <ContentCard>
            <CardTitle>Fill Manager Details</CardTitle>
            <Frm getOnLoad={false}>
              <SimpleBox>
                <FrmInput
                  label="Full Name"
                  name="name"
                  required={true}
                  validators={[required]}
                />
                <FrmInput
                  label="Email"
                  name="email"
                  required={true}
                  validators={[required, email]}
                />
                <FrmInput
                  label="Mobile"
                  name="mobile"
                  required={true}
                  validators={[required, mobile]}
                />
                <FrmDateInput
                  name="dob"
                  label="Date Of Birth"
                  required={true}
                  validators={[required, date]}
                />
                <FrmSelect
                  name="gender"
                  required={true}
                  options={genderOpts}
                  label="Gender"
                  validators={[required]}
                />
                <FrmCheckBox name="isSuperAdmin" label="SuperAdmin" />
              </SimpleBox>
            </Frm>
            {/* <Form>
              <Box>
                {errs && <FrmErrs errs={errs} />}
                <FormInput
                  inputType={"text"}
                  onChange={onChangeName}
                  label={"Full Name"}
                  required={true}
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeEmail}
                  label={"Email"}
                  required={true}
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeMobile}
                  label={"Mobile"}
                  required={true}
                />
                <FormInput
                  inputType={"text"}
                  onChange={onChangeDOB}
                  label={"Date Of Birth (dd-mm-yyyy)"}
                  required={true}
                />
                <Select
                  required={true}
                  options={genderOpts}
                  label={"Gender"}
                  onSelect={onSelectGender}
                />
                <CheckBox onClick={onChangeSuperAdmin} label={"Super Admin"} />
                <FormActions
                  onSubmit={{
                    label: "Submit",
                    onFrmSubmit: onSubmit,
                  }}
                />
              </Box>
            </Form> */}
          </ContentCard>
        </Box>
      </Auth>
    </ContentPage>
  );
}

export default CreateManager;
