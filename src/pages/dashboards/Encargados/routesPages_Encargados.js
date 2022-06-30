import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));

export const managersRoutesConfigs = [
  {
    path: "/encargados/register",
    element: <FormRegister />,
  },
  {
    path: "/encargados/edit",
    element: <FormEdit />,
  },
];
