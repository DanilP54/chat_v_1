import React from "react";

import { AppRouters } from "./routers";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import "../shared/config/firebase";
import { Toaster } from "@/shared/ui/toaster";


// if(process.env.NODE_ENV === "development") {
//   console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// }

// if(process.env.NODE_ENV === "production") {
//   console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <AppRouters />
      <Toaster />
    </React.StrictMode>
  </>,
);
