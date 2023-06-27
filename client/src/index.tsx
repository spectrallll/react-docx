import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app";
import { appStarted } from "@/shared/config/init";

appStarted();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);
