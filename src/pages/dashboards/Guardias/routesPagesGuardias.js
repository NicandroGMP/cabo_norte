import React from "react";
const Bitacora = React.lazy(() => import("./Auth/AuthWorkers/Bitacora"));
const ScanQr = React.lazy(() => import("./Auth/AuthWorkers/ScanQr"));
const HomeGuards = React.lazy(() => import("./Auth/index"));
const AuthWorkers = React.lazy(() => import("./Auth/AuthWorkers"));
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));
export const WardsRoutesConfigs = [
  {
    path: "/guardias/bitacora",
    element: <Bitacora />,
  },
  {
    path: "/trabajadores/bitacora",
    element: <Bitacora />,
  },

  {
    path: "/guardias/entradas/trabajadores",
    element: <AuthWorkers />,
  },
  {
    path: "/guardias/ScanQr",
    element: <ScanQr />,
  },
  {
    path: "/guardias/Home",
    element: <HomeGuards />,
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
