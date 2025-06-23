/**
 * サイトで使用する基本的なコンポーネントとスタイルを定義します。
 */
import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { marked } from "marked";
import "./base.css";
import "./base-mobile.css";
import { useMediaQuery } from "../media.ts";

export * from "../contents.ts"

interface Link {
  url: string;
  name: string;
}

/**
 * スライドメニューを定義
 */
const SlideMenu: React.FC<
  {
    links: Link[];
    op: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  }
> = ({ links, op: [isOpen, setIsOpen] }) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div
      ref={menuRef}
      className={`slide-menu ${isOpen ? "open" : ""}`}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="menu-links">
        {links.map((link, index) =>
          link.url.startsWith("/")
            ? (
              <div
                key={index}
                className="menu-link"
                onClick={() => {
                  navigate(link.url);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </div>
            )
            : (
              <div
                key={index}
                className="menu-link"
                onClick={() => {
                  open(link.url);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </div>
            )
        )}
      </div>
    </div>
  );
};

/**
 * ヘッダーのコンポーネント
 * スマホとPCで表示が変わる
 * スマホではスライドメニューを使用
 */
export function Halo({ links }: { links: Link[] }) {
  const isMobile = useMediaQuery();
  const navigate = useNavigate();
  const op = useState(false);
  if (isMobile) {
    return (
      <div className="halo">
        <div className="halo-content" onClick={() => navigate("/")}>
          <span className="logo"></span>
          <div className="title">
            開成鳥人間の会
            <div className="kite">Kaisei Innovative Technology Engineering</div>
          </div>
        </div>
        <div
          className="menu-button"
          onClick={() => op[1](true)}
          onMouseEnter={() => op[1](true)}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4 5c-.5523 0-1 .4477-1 1 0 .5523.4477 1 1 1h12c.5523 0 1-.4477 1-1 0-.5523-.4477-1-1-1h-16z"
              fill="currentColor"
            />
            <path
              d="m4 9c-.5523 0-1 .4477-1 1 0 .5523.4477 1 1 1h12c.5523 0 1-.4477 1-1 0-.5523-.4477-1-1-1h-16z"
              fill="currentColor"
            />
            <path
              d="m4 13c-.5523 0-1 .4477-1 1 0 .5523.4477 1 1 1h12c.5523 0 1-.4477 1-1 0-.5523-.4477-1-1-1h-16z"
              fill="currentColor"
            />
          </svg>
        </div>
        <SlideMenu op={op} links={links} />
      </div>
    );
  } else {
    return (
      <div className="halo">
        <div className="halo-content" onClick={() => navigate("/")}>
          <span className="logo"></span>
          <div className="title">
            開成鳥人間の会
            <div className="kite">Kaisei Innovative Technology Engineering</div>
          </div>
        </div>
        {links.map((link, index) =>
          link.url.startsWith("/")
            ? (
              <div
                className="halo-content"
                key={index}
                onClick={() => navigate(link.url)}
              >
                <span
                  className={location.pathname === link.url
                    ? "link current"
                    : "link"}
                >
                  {link.name}
                </span>
              </div>
            )
            : (
              <div
                className="halo-content"
                key={index}
                onClick={() => open(link.url)}
              >
                <span className="link">{link.name}</span>
              </div>
            )
        )}
      </div>
    );
  }
}

/**
 * ページ部分のコンポーネント
 */
export function Page({ children }: { children?: React.ReactNode }) {
  const isMobile = useMediaQuery();
  return (
    <div className={isMobile ? "page-mobile" : "page"}>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

/**
 * MarkdownをHTMLに変換して表示するコンポーネント
 */
export function Md2Html(
  props:
    & { md: string }
    & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
): JSX.Element {
  const { md } = props;
  const n = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const html = marked.parse(md);
    if (typeof html === "object") {
      html.then((s) => {
        if (n.current) {
          n.current.innerHTML = s;
        }
      });
    } else {
      if (n.current) {
        n.current.innerHTML = html;
      }
    }
  }, [md]);
  return <div ref={n} {...{ ...props, md: undefined }} />;
}
