import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";

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
