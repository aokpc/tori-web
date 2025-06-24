import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Md2Html, notice, NoticeContent, Page } from "./base.tsx";

import "./notice.css";

/**
 * お知らせページのコンポーネント
 * Haloコンポーネントを使用してリンクを表示し、Pageコンポーネント内にお知らせ内容を表示します。
 */
export function Notice() {
  return (
    <>
      {/* Haloコンポーネントでリンクを表示 */}
      <Halo
        links={links}
      />
      {/* Pageコンポーネントでお知らせ内容を表示 */}
      <Page>
        <h1>お知らせ</h1>
        <Content contents={notice} />
        <div className="bottom">
          <div className="center">
            <Link to="/activity">{">>>活動報告を見る"}</Link>
          </div>
        </div>
      </Page>
    </>
  );
}

/**
 * Contentコンポーネント
 * お知らせ内容をリスト形式で表示します。
 * @param contents - NoticeContent型の配列
 */
function Content({ contents }: { contents: NoticeContent[] }) {
  return contents.map((c, i) => (
    <div className="notice" key={i}>
      <div className="head">
        {/* 日付を表示 */}
        <span className="date">
          {c.date[0].toString().padStart(4, "0")}/{c.date[1].toString()
            .padStart(
              2,
              "0",
            )}/{c.date[2].toString().padStart(2, "0")}
        </span>
        {/* タイトルを表示。重要なお知らせの場合はスタイルを変更 */}
        <span className={c.important ? "title important" : "title"}>
          {c.title}
        </span>
      </div>
      {/* コンテンツが存在する場合はMarkdown形式で表示 */}
      {c.content && <Md2Html className="content" md={c.content} />}
    </div>
  ));
}
