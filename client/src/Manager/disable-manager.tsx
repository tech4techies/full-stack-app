/** @format */

import React, { useState } from "react";
import { ContentPage, SimpleBox, Box } from "../components/Boxes";
import Auth from "./auth";
import { ContentFrmCard, CardTitle } from "../components/Cards";
import { FrmErrs, Form, FormInput } from "../components/Forms";
import { IValidatorResult } from "../utils-lib/validators";

export default function DisableManager() {
  const [errs, setErrs] = useState<null | IValidatorResult[]>(null);
  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          <ContentFrmCard>
            <CardTitle>Disable Manager</CardTitle>
            <Form>
              <Box>
                {errs && <FrmErrs errs={errs} />}
                <FormInput
                  inputType='text'
                  required={true}
                  label={"Manager Email ID/ Manager Mobile No."}
                />
              </Box>
            </Form>
          </ContentFrmCard>
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}
