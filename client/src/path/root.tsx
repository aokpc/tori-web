import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Md2Html, Page } from "./base.tsx";

export function Root() {
  const [top, setTop] = useState(localStorage.getItem("visited") !== "true");
  useEffect(() => {
    setTimeout(() => setTop(false), 12000);
  });
  return (
    <>
      {top ? <Top /> : null}
      <Body />
    </>
  );
}

function Top() {
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    localStorage.setItem("visited", "true");
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.classList.add("fade-out");
      }
    }, 10000);
  }, []);
  return (
    <div className="top" ref={topRef}>
      <video src="/title.mp4" muted autoPlay></video>
    </div>
  );
}

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

const desc =
  `# 開成鳥人間の会 KITE`;

function Desc() {
  return (
    <Page>
        {Md2Html(desc)}
    </Page>
  );
}
