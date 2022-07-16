import React from "react";
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));
const Bitacora = React.lazy(() => import("./Bitacora"));
const ViewQr = React.lazy(() => import("./ViewQr"));
export const WorkersRoutesConfigs = [
  {
    path: "/trabajadores/register",
    element: <FormRegister />,
  },
  {
    path: "/trabajadores/edit",
    element: <FormEdit />,
  },
  {
    path: "/trabajadores/bitacora",
    element: <Bitacora />,
  },
  {
    path: "/trabajadores/ViewQr",
    element: <ViewQr />,
  },
];
