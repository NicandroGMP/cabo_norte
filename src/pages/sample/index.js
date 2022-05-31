import React from "react";

const Home = React.lazy(() => import("./Home"));
const Encargados = React.lazy(() => import("./Encargados"));
const Trabajadores = React.lazy(() => import("./Trabajadores"));

export const samplePagesConfigs = [
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Encargados",
    element: <Encargados />,
  },
  {
    path: "/Trabajadores",
    element: <Trabajadores />,
  },
];
