/** @format */

import { ILeftBarLinkOption, ILeftBarMenuOption } from "../../types";

const mngrLeftBarOptions: Array<ILeftBarLinkOption | ILeftBarMenuOption> = [
  {
    mainLabel: "Manager Services",
    isSuperAdminType: true,
    isListOption: true,
    options: [
      {
        label: "Register a Manager",
        isSuperAdminType: true,
        path: "/manager/create-manager",
      },
      {
        label: "Disbale Manager",
        isSuperAdminType: true,
        path: "/manager/disable-manager",
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
        path: "/manager/create-school",
      },
    ],
  },
];
export default mngrLeftBarOptions;
