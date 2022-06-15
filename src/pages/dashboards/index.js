import React from "react";

const Home = React.lazy(() => import("./Home"));
const Encargados = React.lazy(() => import("./Encargados"));
const Trabajadores = React.lazy(() => import("./Trabajadores"));
const Obras = React.lazy(() => import("./Obras"));
const Proveedores = React.lazy(() => import("./Proveedores"));
const Guardias = React.lazy(() => import("./Guardias"));

export const dashBoardConfigs = [
  {
    path: "/dashboards/home",
    element: <Home />,
  },
  {
    path: "/dashboards/trabajadores",
    element: <Trabajadores />,
  },
  {
    path: "/dashboards/encargados",
    element: <Encargados />,
  },
  {
    path: "/dashboards/obras",
    element: <Obras />,
  },
  {
    path: "/dashboards/proveedores",
    element: <Proveedores />,
  },
  {
    path: "/dashboards/guardias",
    element: <Guardias />,
  },
];
