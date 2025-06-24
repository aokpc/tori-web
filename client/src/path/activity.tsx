import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  activity,
  ActivityContent,
  Halo,
  links,
  Md2Html,
  Page,
} from "./base.tsx";
import { useMediaQuery } from "../media.ts";

import "./activity.css";

/**
 * 活動報告ページのコンポーネント
 * Haloコンポーネントを使用してヘッダーを表示し、Pageコンポーネントでページ全体を構成します。
 * Contentsコンポーネントを呼び出して活動報告の内容を表示します。
 */
export function Activity() {
  return (
    <>
      <Halo
        links={links} // リンク情報を渡してヘッダーを構成
      />
      <Page>
        <h1>活動報告</h1>
        <Contents activity={activity} // 活動報告の内容を表示
        /> 
      </Page>
    </>
  );
}

/**
 * Contentsコンポーネント
 * 活動報告の内容をリスト形式で表示します。
 * @param activity 活動報告の内容を含む配列
 */
function Contents({ activity }: { activity: ActivityContent[] }) {
  const isMobile = useMediaQuery(); // モバイルかどうかを判定
  const className = isMobile ? "activity-mobile" : "activity"; // クラス名を動的に設定

  if (activity.length === 0) {
    return <p>活動報告はまだありません。</p>; // 活動報告がない場合の表示
  }

  return (
    <div className={isMobile ? "activity-contents-mobile" : "activity-contents"}>
      {activity.map((content, i) =>
        content.image
          ? (
            <div className={className} key={i}>
              <h2>{content.title}</h2>
              <img
                src={`/image/activity/${content.image}`} // 画像のパスを動的に設定
                alt={content.title} // 画像の代替テキスト
                className="activity-image"
              />
              <Md2Html md={content.content} /* MarkdownをHTMLに変換して表示 */ />
            </div>
          )
          : (
            <div className={className} key={i}>
              <h2>{content.title}</h2>
              <Md2Html md={content.content} /> {/* MarkdownをHTMLに変換して表示 */}
            </div>
          )
      )}
    </div>
  );
}
