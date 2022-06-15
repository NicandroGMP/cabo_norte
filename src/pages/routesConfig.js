import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkingIcon from "@mui/icons-material/Engineering";
import ManagerIcon from "@mui/icons-material/ManageAccounts";
import WorkIcon from "@mui/icons-material/Work";
import Proveedores from "@mui/icons-material/PeopleOutline";
import Guardias from "@mui/icons-material/LocalPolice";

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
        url: "/dashboards/home",
      },
      {
        id: "trabajadores",
        title: "Trabajadores",
        messageId: "Trabajadores",
        type: "item",
        icon: <WorkingIcon />,
        url: "/dashboards/trabajadores",
      },
      {
        id: "encargados",
        title: "Encargados",
        messageId: "Encargados",
        type: "item",
        icon: <ManagerIcon />,
        url: "/dashboards/encargados",
      },
      {
        id: "obras",
        title: "Obras",
        messageId: "Obras",
        type: "item",
        icon: <WorkIcon />,
        url: "/dashboards/obras",
      },
      {
        id: "proveedores",
        title: "Proveedores",
        messageId: "Proveedores",
        type: "item",
        icon: <Proveedores />,
        url: "/dashboards/proveedores",
      },
      {
        id: "guardias",
        title: "Guardias",
        messageId: "Guardias",
        type: "item",
        icon: <Guardias />,
        url: "/dashboards/guardias",
      },
    ],
  },
];
export default routesConfig;
