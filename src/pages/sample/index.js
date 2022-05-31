import React from "react";

const Home = React.lazy(() => import("./Home"));
const Encargados = React.lazy(() => import("./Encargados"));
const Trabajadores = React.lazy(() => import("./Trabajadores"));
const Obras = React.lazy(() => import("./Obras"));
const Proveedores = React.lazy(() => import("./Proveedores"));
const Guardias = React.lazy(() => import("./Guardias"));

export const samplePagesConfigs = [
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Trabajadores",
    element: <Trabajadores />,
  },
  {
    path: "/Encargados",
    element: <Encargados />,
  },
  {
    path: "/Obras",
    element: <Obras />,
  },
  {
    path: "/Proveedores",
    element: <Proveedores />,
  },
  {
    path: "/Guardias",
    element: <Guardias />,
  },
];
