import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import * as Path from "./path/mod.ts";

/**
 * 全てのルーティングを定義するコンポーネント
 */
export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* ./contents.tsも */}
          <Route path="/" element={<Path.Root />} />
          <Route path="/notice" element={<Path.Notice />} />
          <Route path="/member" element={<Path.Member />} />
          <Route path="/activity" element={<Path.Activity />} />
          <Route path="/design" element={<Path.Design />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
