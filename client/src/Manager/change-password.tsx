/** @format */

import React, { useState } from "react";
import {
  ContentPage,
  InputBox,
  SimpleBox,
  Box,
  FlexBoxRowCenter,
} from "../components/Boxes";
import { CardTitle, ContentCard } from "../components/Cards";
import { InputLabel, StyledInput } from "../components/Inputs";
import { ReqSpan, ErrSpan } from "../components/Span";
import Auth from "./auth";
import { SubmitButton } from "../components/Buttons";
import { ajaxUtils } from "../utils-lib/axios-utils";
import history from "../utils-lib/history";
import Encrypt from "../utils-lib/encrypt";
import config from "../config";

const ArrowRight = require("../assets/right-arrow.svg");

function ChangePassword() {
  const [password, setPassword] = useState<string | null>(null);
  const [passErr, setPassErr] = useState<string | null>(null);
  const [cnfPassword, setCnfPassword] = useState<string | undefined>(undefined);
  const [needle, setNeedle] = useState(false);
  const [policyNeedle, setPolicyNeedle] = useState(false);
  const checkPolicy = (val: string) => {
    const policy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;
    return policy.test(val);
  };
  const onChangePassword = (e: any) => {
    const {
      target: { value },
    } = e;
    setPassword(value);
    if (value.length) {
      if (!checkPolicy(value)) {
        setPolicyNeedle(true);
        setPassErr(
          "Password must contain atleast 10 to 20 characters, containing one lowercase alphabet, uppercase alphabet, numbers, symbols"
        );
      } else {
        setPassErr(null);
        setPolicyNeedle(false);
      }
    } else {
      setNeedle(false);
      setPassErr("Cannot be blank");
    }
  };
  const onChangeCnfPassword = (e: any) => {
    const {
      target: { value },
    } = e;
    setCnfPassword(value);
    if (value !== password) {
      setPassErr("Passwords Cannot be Confirmed");
      setNeedle(true);
    } else {
      setPassErr(null);
      setNeedle(false);
    }
  };

  const isBtnDisabled = () => {
    return !password ||
      (password && password.length === 0) ||
      policyNeedle ||
      needle
      ? true
      : false;
  };

  const onSubmitClick = (e: any) => {
    if (password) {
      ajaxUtils.post(window.location.pathname, {
        password: Encrypt.hashPassword(password, config.secretKey),
      });
      history.pageWaitRefresh();
    }
  };

  return (
    <ContentPage>
      <Auth>
        <SimpleBox>
          <ContentCard>
            <CardTitle>Change Password </CardTitle>
            <Box>
              <InputBox>
                <StyledInput
                  type="password"
                  placeholder=" "
                  autoComplete="off"
                  spellCheck={false}
                  required={true}
                  onChange={onChangePassword}
                />
                <InputLabel>
                  New Password
                  <ReqSpan>*</ReqSpan>
                </InputLabel>
                {passErr && passErr.length > 0 && !needle && (
                  <ErrSpan>{passErr}</ErrSpan>
                )}
              </InputBox>
            </Box>
            <Box>
              <InputBox>
                <StyledInput
                  type="password"
                  placeholder=" "
                  autoComplete="off"
                  spellCheck={false}
                  value={cnfPassword}
                  required={true}
                  disabled={
                    !password ||
                    (password && password.length === 0) ||
                    policyNeedle
                      ? true
                      : false
                  }
                  onChange={onChangeCnfPassword}
                />
                <InputLabel>
                  Confirm Password
                  <ReqSpan>*</ReqSpan>
                </InputLabel>
                {passErr && passErr.length > 0 && needle && (
                  <ErrSpan>{passErr}</ErrSpan>
                )}
              </InputBox>
            </Box>
            <Box>
              <SubmitButton
                onClick={onSubmitClick}
                style={isBtnDisabled() ? { cursor: "not-allowed" } : {}}
                disabled={isBtnDisabled()}
              >
                <FlexBoxRowCenter>
                  <img alt={"Arrow-Right"} src={ArrowRight} />
                  {"Submit"}
                </FlexBoxRowCenter>
              </SubmitButton>
            </Box>
          </ContentCard>
        </SimpleBox>
      </Auth>
    </ContentPage>
  );
}
export default ChangePassword;
