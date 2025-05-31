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
 */
export function Activity() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>活動報告</h1>
        <Contents activity={activity} />
      </Page>
    </>
  );
}

function Contents({ activity }: { activity: ActivityContent[] }) {
  const isMobile = useMediaQuery();
  const className = isMobile ? "activity-mobile" : "activity";
  if (activity.length === 0) {
    return <p>活動報告はまだありません。</p>;
  }
  return (
    <div className={isMobile?"activity-contents-mobile":"activity-contents"}>
      {activity.map((content, i) =>
        content.image
          ? (
            <div className={className} key={i}>
              <h2>{content.title}</h2>
              <img
                src={`/image/activity/${content.image}`}
                alt={content.title}
                className="activity-image"
              />
              <Md2Html md={content.content} />
            </div>
          )
          : (
            <div className={className} key={i}>
              <h2>{content.title}</h2>
              <Md2Html md={content.content} />
            </div>
          )
      )}
    </div>
  );
}
