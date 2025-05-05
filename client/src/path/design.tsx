import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";
import { GLBViewer, STLViewer } from "../three.tsx";

export function Design() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>機体設計</h1>
        <GLBViewer src="/airplane.glb" />
      </Page>
    </>
  );
}

/*
        <h1>機体設計</h1>
        <STLViewer src="/airplane.stl" />
*/