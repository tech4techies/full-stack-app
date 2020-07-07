/** @format */

import React, { useState } from "react";
import { ContentPage, Box, FlexBoxRowCenter } from "../../components/Boxes";
import Auth from "../auth";
import { ContentCard, CardTitle } from "../../components/Cards";
import { Form, FrmErrs, FormInput, FormActions } from "../../components/Forms";
import { IValidatorResult, Validator } from "../../utils-lib/validators";
import { ISchoolDetails } from "../../types";
import { ajaxUtils } from "../../utils-lib/axios-utils";

export default function CreateSchool() {
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const [schoolDetails, setSchoolDetails] = useState<ISchoolDetails>({
    name: "",
    noOfStudents: -1,
    principal: "",
    pocName: "",
    pocEmail: "",
    pocMobile: "",
    street1: "",
    street2: "",
    landMark: "",
    area: "",
    district: "",
    state: "",
    country: "",
    zip: -1,
  });
  const onChangeName = (e: any) => {
    schoolDetails.name = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangePrincipal = (e: any) => {
    schoolDetails.principal = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeNoOfStu = (e: any) => {
    schoolDetails.noOfStudents = parseInt(e.target.value, 10);
    setSchoolDetails(schoolDetails);
  };
  const onChangePocName = (e: any) => {
    schoolDetails.pocName = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangePocEmail = (e: any) => {
    schoolDetails.pocEmail = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangePocMobile = (e: any) => {
    schoolDetails.pocMobile = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeStreet1 = (e: any) => {
    schoolDetails.street1 = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeStreet2 = (e: any) => {
    schoolDetails.street2 = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeLandMark = (e: any) => {
    schoolDetails.landMark = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeArea = (e: any) => {
    schoolDetails.area = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeDistrict = (e: any) => {
    schoolDetails.district = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeState = (e: any) => {
    schoolDetails.state = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeCountry = (e: any) => {
    schoolDetails.country = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const onChangeZip = (e: any) => {
    schoolDetails.zip = e.target.value;
    setSchoolDetails(schoolDetails);
  };
  const validateDetails = (): boolean => {
    const {
      name,
      noOfStudents,
      principal,
      pocName,
      pocEmail,
      pocMobile,
      area,
      street1,
      street2,
      state,
      landMark,
      country,
      district,
      zip,
    } = schoolDetails;
    const requiredErrs: IValidatorResult[] = [
      Validator.isRequired(name, "School Name"),
      Validator.numberRequired(noOfStudents, 10, 100000, "No. Of Students"),
      Validator.isRequired(principal, "Principal"),
      Validator.isRequired(pocName, "POC Name"),
      Validator.isRequired(pocEmail, "POC Email"),
      Validator.isRequired(pocMobile, "POC Mobile"),
      Validator.isRequired(street1, "Street1"),
      Validator.isRequired(street2, "Street2"),
      Validator.isRequired(landMark, "Land Mark"),
      Validator.isRequired(area, "Area"),
      Validator.isRequired(district, "District"),
      Validator.isRequired(state, "State"),
      Validator.isRequired(country, "Country"),
      Validator.numberRequired(zip, 110001, 999999, "ZIP Code"),
    ].filter((errs) => errs.err);
    if (requiredErrs.length) {
      setErrs(requiredErrs);
      return false;
    } else {
      const otherErrs: IValidatorResult[] = [
        Validator.email(pocEmail, "POC Email"),
        Validator.mobile(pocMobile, "POC Mobile"),
      ].filter((errs) => errs.err);
      if (otherErrs.length) {
        setErrs(otherErrs);
        return false;
      } else {
        setErrs(null);
        return true;
      }
    }
  };
  const onSubmit = () => {
    const isValidSuccess = validateDetails();
    if (isValidSuccess)
      ajaxUtils.post("manager/createSchool", { data: { ...schoolDetails } });
  };
  const fBox = {
    width: "50%",
  };

  const sBox = {
    width: "50%",
    marginLeft: 10,
  };
  return (
    <ContentPage>
      <Auth>
        <Box>
          <ContentCard>
            <CardTitle>Fill School Details</CardTitle>
            <Form>
              <Box>
                {errs && <FrmErrs errs={errs.slice(0, 5)} />}
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label={"School Name"}
                    inputType='text'
                    onChange={onChangeName}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='No.Of Students'
                    inputType='number'
                    min={10}
                    max={100000}
                    onChange={onChangeNoOfStu}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label={"Principal"}
                    inputType='text'
                    onChange={onChangePrincipal}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='POC Name'
                    inputType='text'
                    onChange={onChangePocName}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label='POC Email'
                    inputType='text'
                    onChange={onChangePocEmail}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='POC Mobile'
                    inputType='text'
                    onChange={onChangePocMobile}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label='Street 1'
                    inputType='text'
                    onChange={onChangeStreet1}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='Street 2'
                    inputType='text'
                    onChange={onChangeStreet2}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label='Land Mark'
                    inputType='text'
                    onChange={onChangeLandMark}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='Area'
                    inputType='text'
                    onChange={onChangeArea}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label='District'
                    inputType='text'
                    onChange={onChangeDistrict}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='State'
                    inputType='text'
                    onChange={onChangeState}
                  />
                </FlexBoxRowCenter>
                <FlexBoxRowCenter>
                  <FormInput
                    style={fBox}
                    required={true}
                    label='Country'
                    inputType='text'
                    onChange={onChangeCountry}
                  />
                  <FormInput
                    style={sBox}
                    required={true}
                    label='ZIP Code'
                    inputType='number'
                    onChange={onChangeZip}
                    min={110001}
                    max={999999}
                  />
                </FlexBoxRowCenter>
                <FormActions
                  onSubmit={{ label: "Submit", onFrmSubmit: onSubmit }}
                />
              </Box>
            </Form>
          </ContentCard>
        </Box>
      </Auth>
    </ContentPage>
  );
}
