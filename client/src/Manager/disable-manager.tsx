/** @format */

import React, { useState } from "react";
import {
  Box,
  ContentPage,
  SimpleBox,
  FlexBoxRowCenter,
} from "../components/Boxes";
import { CardTitle, ContentCard } from "../components/Cards";
import { Form, FormActions, FormInput, FrmErrs } from "../components/Forms";
import { SimpleTable } from "../components/Table";
import { ajaxUtils } from "../utils-lib/axios-utils";
import { IValidatorResult, Validator } from "../utils-lib/validators";
import Auth from "./auth";

export default function DisableManager() {
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  const [mngrInp, setMngrInp] = useState<null | string>(null);
  const [mngrProfile, setMngrProfile] = useState<null | {
    [k: string]: string;
  }>(null);
  const onSubmit = () => {
    const requiredErrs: IValidatorResult[] = [
      Validator.isRequired(mngrInp, "Manager Email"),
    ].filter((requiredErr) => requiredErr.err);
    if (requiredErrs.length === 0) {
      const validErrs: IValidatorResult[] = [
        Validator.email(mngrInp, "Manager Email"),
      ].filter((vErr) => vErr.err);
      if (validErrs.length > 0) setErrs(validErrs);
      else {
        setErrs(null);
        ajaxUtils.get(`manager/profile/${mngrInp}`).then((res) => {
          if (res) {
            const { success, type, data } = res;
            console.log("data ---", data);
            if (success && type && data) setMngrProfile(data);
          }
        });
      }
    } else setErrs(requiredErrs);
  };
  const onMngrIpChange = (e: any) => setMngrInp(e.target.value);
  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          <SimpleBox>
            <ContentCard>
              <CardTitle>Disable Manager</CardTitle>
              <Form>
                <Box>
                  {errs && <FrmErrs errs={errs} />}
                  <FormInput
                    inputType='text'
                    required={true}
                    onChange={onMngrIpChange}
                    label={"Manager Email"}
                  />
                  {!mngrProfile && (
                    <FormActions
                      onSubmit={{ label: "Submit", onFrmSubmit: onSubmit }}
                    />
                  )}
                </Box>
              </Form>
            </ContentCard>
          </SimpleBox>
          {mngrProfile && (
            <ContentCard>
              <Form>
                <Box>
                  {Object.keys(mngrProfile).map((key) => {
                    return (
                      <FlexBoxRowCenter key={key}>
                        <SimpleBox>{key}</SimpleBox>
                      </FlexBoxRowCenter>
                    );
                  })}
                </Box>
              </Form>
            </ContentCard>
          )}
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}
