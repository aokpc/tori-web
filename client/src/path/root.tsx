import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Md2Html, Page } from "./base.tsx";

import "./root.css";

import root_contents from "./root.md?raw"; // トップ画面のMarkdownコンテンツをインポート

/**
 * ルートページのコンポーネント
 * 初回訪問時にトップ画面を表示し、その後メインコンテンツを表示します。
 */
export function Root() {
  const [top, setTop] = useState(
    /*localStorage.getItem("visited") !== "true"*/ false,
  );
  useEffect(() => {
    // 2秒後にトップ画面を非表示にする
    setTimeout(() => setTop(false), 2000);
  });
  return (
    <>
      {/* 初回訪問時にトップ画面を表示 */}
      {top ? <Top /> : null}
      {/* メインコンテンツを表示 */}
      <Body />
    </>
  );
}

/**
 * トップ画面のコンポーネント
 * 初回訪問時にフェードアウトアニメーションを表示します。
 */
function Top() {
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 訪問済みフラグをローカルストレージに保存
    localStorage.setItem("visited", "true");
    setTimeout(() => {
      if (topRef.current) {
        // フェードアウトアニメーションを適用
        topRef.current.classList.add("fade-out");
      }
    }, 1000);
  }, []);
  return (
    <div className="top" ref={topRef}>
    </div>
  );
}

/**
 * メインコンテンツのコンポーネント
 * 説明文とリンクを表示します。
 */
function Body() {
  return (
    <>
      <Desc />
      <Halo
        links={links}
      />
    </>
  );
}

/**
 * 説明文のコンポーネント
 * ウェブサイトの概要を表示します。
 */
function Desc() {
  return (
    <Page>
      <span className="animation-h1">開成鳥人間の会公式HPへようこそ。</span>
      <img src="/image/main_img.webp" alt="title image" className="title-img" />
      <Md2Html md={root_contents} />

      <div className="bottom">
        <div className="center"><Link to="/notice">{">>>お知らせを見る"}</Link></div>
      </div>
      <div className="center">
        <a href="https://www.instagram.com/kaisei_birdman/">
          <span className="instagram-logo"></span> kaisei_birdman
        </a>
        <a href="https://x.com/kaisei_birdman">
          <span className="x-logo"></span> kaisei_birdman
        </a>
      </div>
      <br />
    </Page>
  );
}
