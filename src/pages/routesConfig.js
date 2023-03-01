import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkingIcon from "@mui/icons-material/Engineering";
import ManagerIcon from "@mui/icons-material/ManageAccounts";
import WorkIcon from "@mui/icons-material/Work";
import Proveedores from "@mui/icons-material/PeopleOutline";
import Guardias from "@mui/icons-material/LocalPolice";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { RoutePermittedRole } from "shared/constants/AppConst";

const routesConfig = [
  {
    id: "app",
    title: "Application",
    messageId: "Dashboard",
    type: "group",
    children: [
      {
        id: "home",
        title: "page 1",
        messageId: "Home",
        type: "item",
        icon: <HomeIcon />,
        url: "/home",
      },
      {
        id: "menu_trabajadores",
        title: "menu_Trabajadores",
        messageId: "Trabajadores",
        permittedRole: RoutePermittedRole.encargado,
        type: "item",
        icon: <WorkingIcon />,
        url: "/trabajadores",
      },

      {
        id: "encargados",
        title: "Encargados",
        messageId: "Encargados",
        type: "item",
        permittedRole: RoutePermittedRole.admin,
        icon: <ManagerIcon />,
        url: "/encargados",
      },
      {
        id: "obras",
        title: "Obras",
        messageId: "Obras",
        permittedRole: RoutePermittedRole.admin,
        type: "item",
        icon: <WorkIcon />,
        url: "/obras",
      },
      {
        id: "proveedores",
        permittedRole: RoutePermittedRole.encargado,
        title: "Proveedores",
        messageId: "Proveedores",
        type: "item",
        icon: <Proveedores />,
        url: "/proveedores",
      },
      {
        id: "guardias",
        title: "Guardias",
        messageId: "Guardias",
        permittedRole: RoutePermittedRole.admin,
        type: "item",
        icon: <Guardias />,
        url: "/guardias",
      },
      {
        id: "bitacora_trabajadores",
        title: "bitacora_Trabajadores",
        messageId: "Bitacora Trabajadores",
        permittedRole: RoutePermittedRole.admin,
        type: "item",
        icon: <AssessmentIcon />,
        url: "/trabajadores/bitacora",
      },
      {
        id: "bitacora_proveedores",
        title: "bitacora_Proveedores",
        messageId: "Bitacora Proveedores",
        permittedRole: RoutePermittedRole.admin,
        type: "item",
        icon: <AssessmentIcon />,
        url: "/proveedores/bitacora",
      },
    ],
  },
];
export default routesConfig;
