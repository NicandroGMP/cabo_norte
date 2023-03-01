import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));

export const WorksRoutesConfigs = [
  {
    path: "/obras/register",
    element: <FormRegister />,
  },
  {
    path: "/obras/edit",
    element: <FormEdit />,
  },
];
