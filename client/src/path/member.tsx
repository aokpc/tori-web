import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, Page,links } from "./base.tsx";

/**
 * メンバー紹介ページのコンポーネント
 */
export function Member() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
      <h1>メンバー</h1>
      </Page>
    </>
  );
}
