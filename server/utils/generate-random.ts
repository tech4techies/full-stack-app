/** @format */

import generate from "nanoid/generate";
import { userType } from "../types";
export function genNum(size: number) {
  const numbers = "1234567890";
  return generate(numbers, size);
}

export function genSmallAlpha(size: number) {
  const smallAlpha = "qazxswedcvfrtgbnhyujmkiolp";
  return generate(smallAlpha, size);
}

export function genCapAlpha(size: number) {
  const capAlpha = "QAZXSWEDCVFRTGBNHYUJMKIOLP";
  return generate(capAlpha, size);
}

export function genSym(size: number) {
  const sym = "!@#$%&*=?";
  return generate(sym, size);
}

export function genId(size: number, all?: boolean) {
  if (all) {
    const alphaNum =
      "AQZ01aqWSXz2MPLNKO3wsxCDE4cRFVdBHUe5rfv6bgt7GTyhn8uYUIjm9kilop";
    return generate(alphaNum, size);
  } else return genNum(8);
}

export function genToken(size: number) {
  const all =
    "az1@Sx2Hs#3Xw4YqN5!Cp6DMlE7$Um8%nQJ?9k&oi,IA0*h1K<b(e2LZd3cOv4)Rf>5rP}6Ft:g7.V]b8y{B9u]0+T1-G=2";
  return generate(all, size);
}

export function genPass(type: string) {
  const pass =
    genSmallAlpha(1) +
    genCapAlpha(1) +
    genSym(1) +
    genSmallAlpha(2) +
    genNum(1) +
    genCapAlpha(2) +
    genNum(1) +
    genSym(1);
  if (type === userType.manager) return pass;
  else if (type === userType.admin) return pass;
  else return genId(8, true);
}
