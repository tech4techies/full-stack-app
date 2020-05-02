/** @format */

import React from "react";
import { Box, FormInput, FormBox } from "../components/Boxes";
import { SimpleCard } from "../components/Cards";
import { TextInput } from "../components/Inputs";
function SchoolLogin() {
  return (
    <Box>
      <SimpleCard>
        <FormBox>
          <FormInput
            inputType={"text"}
            isRequired={true}
            onChange={(e) => {}}
            onFocus={(e) => {}}
            label={"School ID"}
          />
        </FormBox>
      </SimpleCard>
    </Box>
  );
}
export default SchoolLogin;
