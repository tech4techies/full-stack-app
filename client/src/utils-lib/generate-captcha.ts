/** @format */

import generate from "nanoid/generate";
export function genCaptcha(size: number) {
  const alphaNum =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  return generate(alphaNum, size);
}
