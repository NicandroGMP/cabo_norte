import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));

export const managersRoutesConfigs = [
  {
    path: "/managers/register",
    element: <FormRegister />,
  },
  {
    path: "/managers/edit",
    element: <FormEdit />,
  },
];
