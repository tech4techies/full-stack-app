/** @format */

export interface IMngrActivity {
  activity: string;
  browser: string;
  iAt: string;
  os: string;
}

export interface ILeftBarLinkOption {
  label: string;
  isSuperAdminType: boolean;
  path: string;
  isListOption?: false;
}

export interface ILeftBarMenuOption {
  mainLabel: string;
  isListOption: true;
  isSuperAdminType: boolean;
  options: ILeftBarLinkOption[];
}

export interface IOptions {
  label: string;
  value: any;
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
  area: string;
  district: string;
  state: string;
  country: string;
  zip: number;
}

export interface IMngrProfile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  isSuperAdmin: boolean;
}
