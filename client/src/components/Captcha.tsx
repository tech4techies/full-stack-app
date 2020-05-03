/** @format */

import generate from "nanoid/generate";
import React from "react";
import { CaptchaBox } from "./Boxes";
interface ICaptchaProps {
  value: string;
}

export function Captcha(props: ICaptchaProps) {
  const { value } = props;
  return (
    <div style={{ backgroundColor: "#f57c00" }}>
      <CaptchaBox>{atob(value)}</CaptchaBox>
    </div>
  );
}
