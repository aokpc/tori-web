import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Reactのルート要素を取得し、Appコンポーネントをレンダリングする
createRoot(document.getElementById("root")!).render(
  <App />,
);
