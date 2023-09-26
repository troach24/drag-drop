import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Main from './Main';
import PlayerRank from './PlayerRank';
import EditPlayerRank from './EditPlayerRank';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <PlayerRank />},
      { path: "/edit", element: <EditPlayerRank />},
    ]
  },
]);

export default router;
