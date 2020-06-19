/** @format */

import { ILeftBarLinkOption, ILeftBarMenuOption } from "../../types";

const mngrLeftBarOptions: Array<ILeftBarLinkOption | ILeftBarMenuOption> = [
  {
    mainLabel: "Manager Services",
    isSuperAdminType: true,
    isListOption: true,
    options: [
      {
        label: "Create a Manager",
        isSuperAdminType: true,
        path: "/manager/create-mngr",
      },
      {
        label: "Delete Manager",
        isSuperAdminType: true,
        path: "/manager/delete-mngr",
      },
    ],
  },
];
export default mngrLeftBarOptions;
