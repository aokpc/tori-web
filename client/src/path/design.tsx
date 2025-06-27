/**
 * 機体設計ページのコンポーネント
 */
import React from "react";
import { Halo, links, Md2Html, Page } from "./base.tsx";
import { GLBViewer } from "../three.tsx";
import { Link } from "react-router-dom";

import design_contents from "./design.md?raw"; // 機体設計のMarkdownコンテンツをインポート

/**
 * 機体設計ページのメインコンポーネント
 * @returns 機体設計ページの内容
 */
export function Design() {
  return (
    <>
      {/* ヘッダー部分 */}
      <Halo
        links={links} // ヘッダー内のリンク一覧
      />

      {/* ページ内容 */}
      <Page>
        <h1>機体設計</h1> {/* ページタイトル */}

        {/* 3Dモデルビューア */}
        <GLBViewer src="/3d/airplane.glb" />

        {/* MarkdownコンテンツをHTMLに変換して表示 */}
        <Md2Html md={design_contents} />
        <div className="bottom">
          <div className="center">
            <Link to="/">{">>>ホームに戻る"}</Link>
          </div>
        </div>
      </Page>
    </>
  );
}
