import React from "react";

const Home = React.lazy(() => import("./Home"));
const Encargados = React.lazy(() => import("./Encargados"));
const Trabajadores = React.lazy(() => import("./Trabajadores"));
const Obras = React.lazy(() => import("./Obras"));
const Proveedores = React.lazy(() => import("./Proveedores"));
const Guardias = React.lazy(() => import("./Guardias"));

export const dashBoardConfigs = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/trabajadores",
    element: <Trabajadores />,
  },
  {
    path: "/encargados",
    element: <Encargados />,
  },
  {
    path: "/obras",
    element: <Obras />,
  },
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
  {
    path: "/guardias",
    element: <Guardias />,
  },
];
