import { authRouteConfig } from "./auth";
import { initialUrl } from "shared/constants/AppConst";
import { Navigate } from "react-router-dom";
import Error403 from "./errorPages/Error403";
import React from "react";
import { errorPagesConfigs } from "./errorPages";
import { dashBoardConfigs } from "./dashboards";
import { accountPagesConfigs } from "./account";
import { updatePassConfigs } from "./recovePass";
import { managersRoutesConfigs } from "./dashboards/Encargados/routesPages_Encargados";
import { WorksRoutesConfigs } from "./dashboards/Obras/routesPagesWorks";
import { WorkersRoutesConfigs } from "./dashboards/Trabajadores/routesPagesWorkers";
import { WardsRoutesConfigs } from "./dashboards/Guardias/routesPagesGuardias";
const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    ...accountPagesConfigs,
    ...managersRoutesConfigs,
    ...WorksRoutesConfigs,
    ...WorkersRoutesConfigs,
    ...WardsRoutesConfigs
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: [...authRouteConfig, ...updatePassConfigs],
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: "/",
      element: <Navigate to={initialUrl} />,
    },
    {
      path: "*",
      element: <Navigate to="/error-pages/error-404" />,
    },
  ]),
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
