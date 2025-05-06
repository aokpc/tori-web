import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Md2Html, notice, NoticeContent, Page } from "./base.tsx";

import "./notice.css";

export function Notice() {
  return (
    <>
      <Halo
        links={links}
      />
      <Page>
        <h1>お知らせ</h1>
        <Content contents={notice} />
      </Page>
    </>
  );
}

function Content({ contents }: { contents: NoticeContent[] }) {
  return contents.map((c, i) => (
    <div className="notice" key={i}>
      <div className="head">
        <span className="date">
          {c.date[0].toString().padStart(4, "0")}/{c.date[1].toString()
            .padStart(
              2,
              "0",
            )}/{c.date[2].toString().padStart(2, "0")}
        </span>
        <span className={c.important ? "title important" : "title"}>
          {c.title}
        </span>
      </div>
      {c.content && <Md2Html className="content" md={c.content} />}
    </div>
  ));
}
