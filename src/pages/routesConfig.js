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
        url: "/home",
      },
      {
        id: "trabajadores",
        title: "Trabajadores",
        messageId: "Trabajadores",
        type: "item",
        icon: <WorkingIcon />,
        url: "/trabajadores",
      },
      {
        id: "encargados",
        title: "Encargados",
        messageId: "Encargados",
        type: "item",
        icon: <ManagerIcon />,
        url: "/encargados",
      },
      {
        id: "obras",
        title: "Obras",
        messageId: "Obras",
        type: "item",
        icon: <WorkIcon />,
        url: "/obras",
      },
      {
        id: "proveedores",
        title: "Proveedores",
        messageId: "Proveedores",
        type: "item",
        icon: <Proveedores />,
        url: "proveedores",
      },
      {
        id: "guardias",
        title: "Guardias",
        messageId: "Guardias",
        type: "item",
        icon: <Guardias />,
        url: "/guardias",
      },
    ],
  },
];
export default routesConfig;
