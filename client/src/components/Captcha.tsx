/** @format */

import React from "react";
import { CaptchaBox } from "./Boxes";
interface ICaptchaProps {
  value: string;
}

export function Captcha(props: ICaptchaProps) {
  const { value } = props;
  return (
    <div style={{ backgroundColor: "#f57c00", minWidth: "40%", width: "40%" }}>
      <CaptchaBox>{atob(value)}</CaptchaBox>
    </div>
  );
}
