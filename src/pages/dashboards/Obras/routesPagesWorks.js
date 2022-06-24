import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));

export const WorksRoutesConfigs = [
  {
    path: "/works/register",
    element: <FormRegister />,
  },
  {
    path: "/works/edit",
    element: <FormEdit />,
  },
];
