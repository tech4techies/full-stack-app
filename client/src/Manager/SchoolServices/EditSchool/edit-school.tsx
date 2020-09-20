/** @format */

import React from "react";
import { ContentPage, SimpleBox } from "../../../components/Boxes";
import { CardTitle, ContentCard } from "../../../components/Cards";
import { Frm } from "../../../components/Forms";
import { FrmInput } from "../../../components/Inputs";
import history from "../../../utils-lib/history";
import { required } from "../../../utils-lib/validators";
import Auth from "../../auth";

export default function EditSchool() {
  const onValidApiSuccess = (res: any) => {
    if (res && res.valid) {
      const { id } = res;
      const {
        location: { pathname },
      } = window;
      history.redirectTo(`${pathname}/${id}`);
    }
  };

  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          <ContentCard>
            <CardTitle>Edit School Info</CardTitle>
            <Frm getOnLoad={false} onSuccess={onValidApiSuccess}>
              <SimpleBox>
                <FrmInput
                  label="School Id/Mobile No./Email Id"
                  name="input"
                  required={true}
                  validators={[required]}
                />
              </SimpleBox>
            </Frm>
          </ContentCard>
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}
