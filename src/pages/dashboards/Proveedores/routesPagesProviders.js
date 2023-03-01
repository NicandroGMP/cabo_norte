import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));
const ViewQr = React.lazy(() => import("./ViewQr"));
export const ProvidersRoutesConfigs = [
  {
    path: "/proveedores/register",
    element: <FormRegister />,
  },
  {
    path: "/proveedores/edit",
    element: <FormEdit />,
  },
  {
    path: "/proveedores/ViewQr",
    element: <ViewQr />,
  },
];
