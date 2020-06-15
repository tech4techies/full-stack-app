/** @format */

import { Request } from "express";

export function getIp(req: Request) {
  return req.headers["x-forwarded-for"] as string;
}

export function getUserBrowser(req: Request) {
  const userAgent = req.headers["user-agent"] || "";
  const isOpera = userAgent.indexOf("OP") > -1;
  const isChrome = userAgent.indexOf("Chrome") > -1 && !isOpera;
  const isFireFox = userAgent.indexOf("Firefox") > -1;
  const isEdge = userAgent.indexOf("Edge") > -1;
  const isIE = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1;
  const isSafari = userAgent.indexOf("Safari") > -1 && !isChrome;
  if (isOpera) return "Opera";
  else if (isSafari) return "Safari";
  else if (isChrome) return "Chrome";
  else if (isFireFox) return "Firefox";
  else if (isEdge) return "Microsoft Edge";
  else if (isIE) return "Internet Explorer";
  else return "No Popular Browser detected!";
}

export function getUserOS(req: Request) {
  const userAgent = req.headers["user-agent"] || "";
  if (userAgent.indexOf("Win") != -1) return "Windows";
  else if (userAgent.indexOf("Mac") != -1) return "Macintosh";
  else if (userAgent.indexOf("Linux") != -1) return "Linux";
  else if (userAgent.indexOf("Android") != -1) return "Android";
  else if (userAgent.indexOf("like Mac") != -1) return "iOS";
  else return "No Popular OS detected!";
}
