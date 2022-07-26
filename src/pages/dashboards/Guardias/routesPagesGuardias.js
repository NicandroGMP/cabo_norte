import React from "react";
const Bitacora = React.lazy(() => import("./Auth/Bitacora"));
const ScanQr = React.lazy(() => import("./Auth/ScanQr"));
const Auth = React.lazy(() => import("./Auth/index"));
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));
export const WardsRoutesConfigs = [
  {
    path: "/guardias/bitacora_trabajadores",
    element: <Bitacora />,
  },
  {
    path: "/guardias/ScanQr",
    element: <ScanQr />,
  },
  {
    path: "/guardias/auth",
    element: <Auth />,
  },
  {
    path: "/guardias/register",
    element: <FormRegister />,
  },
  {
    path: "/guardias/edit",
    element: <FormEdit />,
  },
];
