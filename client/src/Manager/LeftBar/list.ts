/** @format */

import { ILeftBarLinkOption, ILeftBarMenuOption } from "../../types";

const mngrLeftBarOptions: Array<ILeftBarLinkOption | ILeftBarMenuOption> = [
  {
    mainLabel: "Manager Services",
    isSuperAdminType: true,
    isListOption: true,
    options: [
      {
        label: "Register Manager",
        isSuperAdminType: true,
        path: "/manager/create",
      },
      {
        label: "Edit Manager",
        isSuperAdminType: true,
        path: "/manager/edit",
      },
    ],
  },
  {
    mainLabel: "School Services",
    isSuperAdminType: false,
    isListOption: true,
    options: [
      {
        label: "Register a School",
        isSuperAdminType: false,
        path: "/manager/school/create",
      },
      {
        label: "Edit School Info",
        isSuperAdminType: false,
        path: "/manager/school/edit",
      },
    ],
  },
];
export default mngrLeftBarOptions;
