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
        path: "/manager/create-manager",
      },
      {
        label: "Edit Manager",
        isSuperAdminType: true,
        path: "/manager/edit-manager",
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
        label: "Billing",
        isSuperAdminType: false,
        path: "/manager/school/billing",
      },
    ],
  },
];
export default mngrLeftBarOptions;
