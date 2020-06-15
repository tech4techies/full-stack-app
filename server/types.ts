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
