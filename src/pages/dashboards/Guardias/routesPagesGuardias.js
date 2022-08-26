import React from "react";
const Bitacora = React.lazy(() => import("./Auth/AuthWorkers/Bitacora"));
const BitacoraProviders = React.lazy(() =>
  import("./Auth/AuthProviders/Bitacora")
);
const ScanQr = React.lazy(() => import("./Auth/AuthWorkers/ScanQr"));
const ExitScanQr = React.lazy(() => import("./Auth/ExitWorkers/ScanQr"));
const HomeGuards = React.lazy(() => import("./Auth/index"));
const AuthWorkers = React.lazy(() => import("./Auth/AuthWorkers"));
const ExitWorkers = React.lazy(() => import("./Auth/ExitWorkers"));
const AuthProviders = React.lazy(() => import("./Auth/AuthProviders"));
const FormRegister = React.lazy(() => import("./register"));
const FormEdit = React.lazy(() => import("./Edit"));
const ListBatch = React.lazy(() => import("./Auth/AuthProviders/listBatchs"));
const Cones = React.lazy(() => import("./Auth/AuthProviders/listCones"));
const ListServices = React.lazy(() =>
  import("./Auth/AuthProviders/listServices")
);
export const WardsRoutesConfigs = [
  {
    path: "/guardias/bitacora_trabajadores",
    element: <Bitacora />,
  },
  {
    path: "/trabajadores/bitacora",
    element: <Bitacora />,
  },
  {
    path: "/proveedores/bitacora",
    element: <BitacoraProviders />,
  },
  {
    path: "/guardias/bitacora_proveedores",
    element: <BitacoraProviders />,
  },

  {
    path: "/guardias/entradas/trabajadores",
    element: <AuthWorkers />,
  },
  {
    path: "/guardias/salidas/trabajadores",
    element: <ExitWorkers />,
  },
  {
    path: "/guardias/entradas/proveedores",
    element: <AuthProviders />,
  },
  {
    path: "/guardias/entradas/lotes",
    element: <ListBatch />,
  },
  {
    path: "/guardias/entradas/servicios",
    element: <ListServices />,
  },
  {
    path: "/guardias/entradas/cones",
    element: <Cones />,
  },
  {
    path: "/guardias/entrada/ScanQr",
    element: <ScanQr />,
  },
  {
    path: "/guardias/salida/ScanQr",
    element: <ExitScanQr />,
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
