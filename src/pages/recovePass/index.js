import React from "react";

const UpdatePass = React.lazy(() => import("./updatePass"));

export const updatePassConfigs = [
  {
    path: "/newPass",
    element: <UpdatePass />,
  },
];
