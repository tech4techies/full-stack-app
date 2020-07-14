/** @format */

import React, { useState } from "react";
import {
  Form,
  FormInput,
  FormActions,
  FrmErrs,
} from "../../../components/Forms";
import { Box } from "../../../components/Boxes";
import { CheckBox } from "../../../components/CheckBox";
import { ajaxUtils } from "../../../utils-lib/axios-utils";
import { Select } from "../../../components/Select";
import { genderOpts } from "../../common";
import history from "../../../utils-lib/history";
import { IValidatorResult, Validator } from "../../../utils-lib/validators";

interface IProps {
  mngrProfile: { [k: string]: any };
}

export default function EditMngrForm(props: IProps) {
  const { mngrProfile } = props;
  const [newMngrProfile, setNewMngrProfile] = useState<{
    [k: string]: any;
  }>(mngrProfile);
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const onEditName = (e: any) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.name = e.target.value;
      setNewMngrProfile(newMngrProfile);
    }
  };
  const onEditEmail = (e: any) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.email = e.target.value;
      setNewMngrProfile(newMngrProfile);
    }
  };
  const onEditDob = (e: any) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.dob = e.target.value;
      setNewMngrProfile(newMngrProfile);
    }
  };
  const onEditMobile = (e: any) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.mobile = e.target.value;
      setNewMngrProfile(newMngrProfile);
    }
  };

  const onChangeSuperAdmin = (val: boolean) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.isSuperAdmin = val;
      setNewMngrProfile(newMngrProfile);
    }
  };

  const onChangeDisbaled = (val: boolean) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.disabled = val;
      setNewMngrProfile(newMngrProfile);
    }
  };

  const onSubmit = () => {
    const requiredErrs: IValidatorResult[] = [
      Validator.isRequired(newMngrProfile.name, "Full Name"),
      Validator.email(newMngrProfile.email, "Email"),
      Validator.isRequired(newMngrProfile.dob, "Date of Birth"),
      Validator.isRequired(newMngrProfile.mobile, "Mobile"),
      Validator.isRequired(newMngrProfile.gender, "Gender"),
    ].filter((errs) => errs.err);
    if (requiredErrs.length > 0) setErrs(requiredErrs);
    else {
      const validErrs: IValidatorResult[] = [
        Validator.email(newMngrProfile.email, "Email"),
        Validator.mobile(newMngrProfile.mobile, "Mobile"),
        Validator.date(newMngrProfile.dob, "Date Of Birth"),
      ].filter((errs) => errs.err);
      if (validErrs.length > 0) setErrs(validErrs);
      else {
        setErrs(null);
        ajaxUtils
          .post(`manager/profile/${mngrProfile.email}`, {
            data: newMngrProfile,
          })
          .then(() => history.pageRefresh());
      }
    }
  };

  const onChangeGender = (val: string) => {
    if (mngrProfile) {
      const newMngrProfile = { ...mngrProfile };
      newMngrProfile.gender = val;
      setNewMngrProfile(newMngrProfile);
    }
  };
  return (
    <Form>
      <Box>
        {errs && <FrmErrs errs={errs} />}
        <FormInput
          inputType="text"
          required={true}
          onChange={onEditName}
          label="Full Name"
          value={newMngrProfile.name}
        />
        <FormInput
          inputType="text"
          required={true}
          onChange={onEditEmail}
          label="Email"
          value={newMngrProfile.email}
        />
        <FormInput
          inputType="text"
          value={newMngrProfile.dob}
          required={true}
          onChange={onEditDob}
          label="Date of Birth (dd-mm-yyyy)"
        />
        <FormInput
          inputType="text"
          value={newMngrProfile.mobile}
          required={true}
          onChange={onEditMobile}
          label="Mobile"
        />
        <Select
          required={true}
          label={"Gender"}
          options={genderOpts}
          value={newMngrProfile.gender}
          onSelect={onChangeGender}
        />
        <CheckBox
          onClick={onChangeSuperAdmin}
          label="Super Admin"
          value={newMngrProfile.isSuperAdmin}
        />
        <CheckBox
          onClick={onChangeDisbaled}
          label="Disbale"
          value={newMngrProfile.disabled}
        />
        <FormActions onSubmit={{ label: "Submit", onFrmSubmit: onSubmit }} />
      </Box>
    </Form>
  );
}
