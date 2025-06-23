import React from "react";
import { Halo, links, Page,design_contents,Md2Html } from "./base.tsx";
import { GLBViewer, STLViewer } from "../three.tsx";

/**
 * 機体設計ページのコンポーネント
 */
export function Design() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>機体設計</h1>
        <GLBViewer src="/3d/airplane.glb" />
        <Md2Html md={design_contents} />
      </Page>
    </>
  );
}
