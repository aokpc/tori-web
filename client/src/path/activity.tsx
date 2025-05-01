import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";

export function Activity() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>活動報告</h1>
      </Page>
    </>
  );
}
