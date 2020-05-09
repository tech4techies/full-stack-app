/** @format */

import crypto from "crypto";
import btoa from "btoa";
export default class Encrypt {
  static generateTokens(s: string, noOfPairs: number) {
    const pairsLen = Math.round(s.length / noOfPairs);
    const tokens: string[] = [];
    for (let i = 0; i < s.length; i += pairsLen)
      tokens.push(s.slice(i, i + (pairsLen - 1)));
    return tokens;
  }
  static swapTokens(pairs: string[]) {
    let tempToken: string;
    const midVal = this.getMidVal(pairs);
    for (let i = 0; i < midVal; i += 1) {
      const rightSide = pairs.length - (i + 1);
      const leftSide = i;
      tempToken = pairs[leftSide];
      pairs[leftSide] = pairs[rightSide];
      pairs[rightSide] = tempToken;
    }
    return pairs;
  }
  static getMidVal(pairs: string[]) {
    return (
      (pairs.length / 2 === 0
        ? pairs.length / 2
        : Math.round(pairs.length / 2)) - 1
    );
  }
  static hash(val: string, secret: string) {
    const secretTokens = this.generateTokens(secret, 5);
    const midVal = this.getMidVal(secretTokens);
    const valTokens: string[] = this.generateTokens(val, 6);
    const swappedTokens = this.swapTokens(valTokens);
    const allTokens: string[] = [];
    for (let i = 0; i < midVal; i += 1) allTokens.push(secretTokens[i]);
    allTokens[midVal] = secretTokens[midVal];
    for (let i = midVal + 1, j = 0; j < swappedTokens.length; i += 1, j += 1)
      allTokens[i] = swappedTokens[j];
    for (
      let i = allTokens.length, j = midVal + 1;
      j < secretTokens.length;
      i += 1, j += 1
    )
      allTokens[i] = secretTokens[j];
    return crypto
      .createHmac("sha256", allTokens.reverse().join(""))
      .update(val)
      .digest("hex");
  }
}

export class ClientEncrypt {
  static generateTokens(s: string, noOfPairs: number) {
    const pairsLen = Math.round(s.length / noOfPairs);
    const tokens: string[] = [];
    for (let i = 0; i < s.length; i += pairsLen)
      tokens.push(s.slice(i, i + (pairsLen - 1)));
    return tokens;
  }
  static swapTokens(pairs: string[]) {
    let tempToken: string;
    const midVal = this.getMidVal(pairs);
    for (let i = 0; i < midVal; i += 1) {
      const rightSide = pairs.length - (i + 1);
      const leftSide = i;
      tempToken = pairs[leftSide];
      pairs[leftSide] = pairs[rightSide];
      pairs[rightSide] = tempToken;
    }
    return pairs;
  }
  static getMidVal(pairs: string[]) {
    return (
      (pairs.length / 2 === 0
        ? pairs.length / 2
        : Math.round(pairs.length / 2)) - 1
    );
  }
  static hashPassword(val: string, secret: string) {
    const secretTokens = this.generateTokens(secret, 5);
    const midVal = this.getMidVal(secretTokens);
    const valTokens: string[] = this.generateTokens(btoa(val), 4);
    const swappedTokens = this.swapTokens(valTokens);
    const allTokens: string[] = [];
    for (let i = 0; i < midVal; i += 1) allTokens.push(secretTokens[i]);
    allTokens[midVal] = secretTokens[midVal];
    for (let i = midVal + 1, j = 0; j < swappedTokens.length; i += 1, j += 1)
      allTokens[i] = swappedTokens[j];
    for (
      let i = allTokens.length, j = midVal + 1;
      j < secretTokens.length;
      i += 1, j += 1
    )
      allTokens[i] = secretTokens[j];
    return btoa(
      crypto
        .createHmac("sha256", allTokens.reverse().join(""))
        .update(val)
        .digest("hex"),
    ).replace("==", "");
  }
}
