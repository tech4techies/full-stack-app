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
        path: "/manager/create-new",
      },
    ],
  },
];
export default mngrLeftBarOptions;
