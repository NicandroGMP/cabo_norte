import React from "react";
const Bitacora = React.lazy(() => import("./Bitacora"));
const ScanQr = React.lazy(() => import("./ScanQr"));
export const WardsRoutesConfigs = [
  {
    path: "/guardias/bitacora",
    element: <Bitacora />,
  },
  {
    path: "/guardias/ScanQr",
    element: <ScanQr />,
  },
];
