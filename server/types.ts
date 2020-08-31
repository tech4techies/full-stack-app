/** @format */

export interface IManagerContext {
  name: string;
  email: string;
  mobile: string;
  password: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export interface IMngrActivity {
  activity: string;
  id: string;
  ip: string;
  browser: string;
  userAgent: string;
  os: string;
  iAt: string;
}

export enum userType {
  admin = "admin",
  manager = "mngr",
}

export interface ISchoolDetails {
  name: string;
  noOfStudents: number;
  principal: string;
  pocName: string;
  pocEmail: string;
  pocMobile: string;
  street1: string;
  street2: string;
  landMark: string;
  areaName: string;
  district: string;
  state: string;
  country: string;
  zip: number;
  billingType: string;
  billingAmount: null | number;
  isDefault: boolean;
  disabled: boolean;
}

export interface ISchool {
  name: string;
}
