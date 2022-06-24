import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));

export const WorkersRoutesConfigs = [
  {
    path: "/workers/register",
    element: <FormRegister />,
  },
  {
    path: "/workers/edit",
    element: <FormEdit />,
  },
];
