/** @format */

import styled from "@emotion/styled";
import React from "react";
import {
  ContentPage,
  FlexBoxRowCenter,
  SimpleBox,
} from "../../components/Boxes";
import { CardTitle, ContentCard } from "../../components/Cards";
import { Frm } from "../../components/Forms";
import { FrmInput } from "../../components/Inputs";
import FrmSelect from "../../components/Select";
import history from "../../utils-lib/history";
import { email, mobile, required } from "../../utils-lib/validators";
import Auth from "../auth";
import { billingOptions } from "../options";

const FieldBox = styled(SimpleBox)`
  width: 50%;
  padding: 5px;
  height: 60px;
`;

const FlexBox = styled(FlexBoxRowCenter)`
  width: 100%;
`;

export default function CreateSchool() {
  const postSuccess = () =>
    setTimeout(() => history.redirectTo("/manager/dashboard"), 300);

  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          <ContentCard>
            <CardTitle>Fill the School Details</CardTitle>
            <Frm getOnLoad={false} onSuccess={postSuccess}>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    name="name"
                    label="School Name"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="Prinicipal"
                    name="principal"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    type="number"
                    label="No. Of Students"
                    name="noOfStudents"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    name="pocName"
                    label="POC Name"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    label="POC Email"
                    name="pocEmail"
                    required={true}
                    validators={[required, email]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="POC Mobile"
                    name="pocMobile"
                    required={true}
                    validators={[required, mobile]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    label="Street 1"
                    name="street1"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="Street 2"
                    name="street2"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput label="Land Mark" name="landmark" />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="Village/Town"
                    name="areaName"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    label="District/Zone"
                    name="district"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="State/Province"
                    name="state"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmInput
                    label="Country"
                    name="country"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    label="ZIP Code"
                    name="zipCode"
                    type="number"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
              <FlexBox>
                <FieldBox>
                  <FrmSelect
                    name="billingType"
                    options={billingOptions}
                    validators={[required]}
                    required={true}
                    label="Billing Type"
                  />
                </FieldBox>
                <FieldBox>
                  <FrmInput
                    style={{ paddingTop: 17 }}
                    label="Billing Amount"
                    name="billingAmount"
                    type="number"
                    required={true}
                    validators={[required]}
                  />
                </FieldBox>
              </FlexBox>
            </Frm>
          </ContentCard>
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}
