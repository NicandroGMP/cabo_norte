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
    title: "Sample",
    messageId: "sidebar.sample",
    type: "group",
    children: [
      {
        id: "page-1",
        title: "home",
        messageId: "Home",
        type: "item",
        icon: <HomeIcon />,
        url: "/Home",
      },
      {
        id: "page-2",
        title: "Trabajadores",
        messageId: "Trabajadores",
        type: "item",
        icon: <WorkingIcon />,
        url: "/Trabajadores",
      },
      {
        id: "page-3",
        title: "Encargados",
        messageId: "Encargados",
        type: "item",
        icon: <ManagerIcon />,
        url: "/Encargados",
      },
      {
        id: "page-4",
        title: "Obras",
        messageId: "Obras",
        type: "item",
        icon: <WorkIcon />,
        url: "/Obras",
      },
      {
        id: "page-5",
        title: "Proveedores",
        messageId: "Proveedores",
        type: "item",
        icon: <Proveedores />,
        url: "/Proveedores",
      },
      {
        id: "page-6",
        title: "Guardias",
        messageId: "Guardias",
        type: "item",
        icon: <Guardias />,
        url: "/Guardias",
      },
    ],
  },
];
export default routesConfig;
