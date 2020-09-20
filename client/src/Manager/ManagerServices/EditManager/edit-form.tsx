/** @format */

import React, { useLayoutEffect, useState } from "react";
import { ContentPage, SimpleBox } from "../../../components/Boxes";
import { CardTitle, ContentCard } from "../../../components/Cards";
import FrmCheckBox from "../../../components/CheckBox";
import { Frm } from "../../../components/Forms";
import { FrmDateInput, FrmInput } from "../../../components/Inputs";
import FrmSelect from "../../../components/Select";
import { ajaxUtils } from "../../../utils-lib/axios-utils";
import history from "../../../utils-lib/history";
import { date, mobile, required } from "../../../utils-lib/validators";
import Auth from "../../auth";
import { genderOpts } from "../../options";
// import { IValidatorResult, Validator } from "../../../utils-lib/validators";

interface IProps {}

export default function EditMngrForm(props: IProps) {
  const [isValid, setValid] = useState<null | object>(null);
  const [isComplete, setComplete] = useState(false);
  useLayoutEffect(() => {
    const {
      location: { pathname },
    } = window;
    const apiPath = pathname.replace("/", "");
    ajaxUtils.get(apiPath).then((res: any) => {
      if (res) setValid(res);
      else history.redirectTo("/manager/edit");
      setComplete(true);
    });
  }, []);

  const onPostSuccess = () => history.goBack();
  return (
    <ContentPage>
      {isComplete && (
        <Auth>
          <SimpleBox>
            {isValid && (
              <ContentCard>
                <CardTitle>Edit Manager</CardTitle>
                <Frm onSuccess={onPostSuccess}>
                  <SimpleBox>
                    <FrmInput
                      name="name"
                      label="Full Name"
                      required={true}
                      validators={[required]}
                    />
                    <FrmInput
                      name="mobile"
                      label="Mobile Number"
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
                      options={genderOpts}
                      name="gender"
                      label="Gender"
                      required={true}
                      validators={[required]}
                    />
                    <FrmCheckBox name="disabled" label="Disable" />
                    <FrmCheckBox name="isSuperAdmin" label="SuperAdmin" />
                  </SimpleBox>
                </Frm>
              </ContentCard>
            )}
          </SimpleBox>
        </Auth>
      )}
    </ContentPage>
  );
}
