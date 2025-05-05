import React from "react";
import { Halo, links, Page } from "./base.tsx";
import { useCache } from "../res.ts";
import { GLBViewer, STLViewer } from "../three.tsx";

export function Design() {
  const data = useCache("/3d/airplane.glb", "blob");
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>機体設計</h1>
        <GLBViewer src={data} />
      </Page>
    </>
  );
}
