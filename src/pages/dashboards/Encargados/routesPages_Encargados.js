import React from "react";
const FormRegister = React.lazy(() => import("./register"));

export const managersRoutesConfigs = [
  {
    path: "/dashboards/register_managers",
    element: <FormRegister />,
  },
];
