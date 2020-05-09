/** @format */

import generate from "nanoid/generate";
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

export function genId(size: number) {
  const alphaNum =
    "AQZ01aqWSXz2MPLNKO3wsxCDE4cRFVdBHUe5rfv6bgt7GTyhn8uYUIjm9kilop";
  return generate(alphaNum, size);
}

export function genMngrPass(type: string) {
  if (type === "mngr")
    return (
      genSmallAlpha(1) +
      genCapAlpha(1) +
      genSym(2) +
      genSmallAlpha(2) +
      genNum(2) +
      genCapAlpha(2)
    );
  else return genId(8);
}
