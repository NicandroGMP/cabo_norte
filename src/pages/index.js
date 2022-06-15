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

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    ...accountPagesConfigs,
    ...managersRoutesConfigs,
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
