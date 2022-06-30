import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkingIcon from "@mui/icons-material/Engineering";
import ManagerIcon from "@mui/icons-material/ManageAccounts";
import WorkIcon from "@mui/icons-material/Work";
import Proveedores from "@mui/icons-material/PeopleOutline";
import Guardias from "@mui/icons-material/LocalPolice";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

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
        type: "collapse",
        icon: <WorkingIcon />,
        children: [
          {
            id: "trabajadores",
            title: "Trabajadores",
            messageId: "Trabajadores",
            type: "item",
            icon: <ArrowRightAltIcon />,
            url: "/trabajadores",
          },
          {
            id: "Bitacora_trabajadores",
            title: "Bitacora_Trabajadores",
            messageId: "Bitacora Trabajadores",
            type: "item",
            icon: <ArrowRightAltIcon />,
            url: "/trabajadores/bitacora",
          },
        ],
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
        type: "collapse",
        icon: <Proveedores />,
        children: [
          {
            id: "proveedores",
            title: "proveedores",
            messageId: "proveedores",
            type: "item",
            icon: <ArrowRightAltIcon />,
            url: "/proveedores",
          },
          {
            id: "Bitacora_proveedores",
            title: "Bitacora_proveedores",
            messageId: "Bitacora Proveedores",
            type: "item",
            icon: <ArrowRightAltIcon />,
            url: "/bitacora_proveedores",
          },
        ],
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
