import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";

export function History() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
      <h1>沿革</h1>
      </Page>
    </>
  );
}
