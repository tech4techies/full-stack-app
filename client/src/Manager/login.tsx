/** @format */

import React from "react";
import { Box } from "../components/Boxes";
import { CardTitle, FormCard } from "../components/Cards";
import { Frm } from "../components/Forms";
import { FrmInput } from "../components/Inputs";
import { required } from "../utils-lib/validators";
import Auth from "./auth";
import history from "../utils-lib/history";
function Login() {
  const onSuccess = (res: any) => {
    if (res && res.isDefault)
      setTimeout(() => history.redirectTo("/manager/changePassword"), 300);
    else setTimeout(() => history.redirectTo("/manager/dashboard"), 200);
  };
  return (
    <Auth>
      <Box>
        <FormCard>
          <CardTitle>Manager Login</CardTitle>
          <Frm onSuccess={onSuccess} getOnLoad={false}>
            <Box>
              <FrmInput
                name="userName"
                required={true}
                label="UserName"
                validators={[required]}
              />
              <FrmInput
                name="password"
                type="password"
                required={true}
                label="Password"
                validators={[required]}
              />
            </Box>
          </Frm>
        </FormCard>
      </Box>
    </Auth>
  );
}
export default Login;
