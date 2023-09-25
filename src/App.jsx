import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./Header";
import PlayerRank from "./PlayerRank";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
