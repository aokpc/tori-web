/**
 * メンバー紹介ページのコンポーネント
 */
import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";

import "./contact.css";

/**
 * お問い合わせページのメインコンポーネント
 * @returns お問い合わせフォームとヘッダー
 */
export function Contacts() {
  const buttonRef = useRef<HTMLButtonElement>(null); // 送信ボタンの参照
  const [formData, setFormData] = useState({
    name: "", // 名前フィールド
    email: "", // メールアドレスフィールド
    message: "", // メッセージフィールド
  });
  const [error, setError] = useState(""); // エラーメッセージ
  const [success, setSuccess] = useState(false); // 成功状態

  /**
   * フォームフィールドの変更を処理
   * @param e - 入力イベント
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * フォーム送信を処理
   * @param e - フォーム送信イベント
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // メールアドレスの形式を検証
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("正しいメールアドレスを入力してください。");
      return;
    }

    setError("送信しています...");

    if (buttonRef.current) {
      buttonRef.current.disabled = true; // ボタンを無効化
    }

    const sendData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // 名前が空の場合は"None"に設定
    if (sendData.name === "") {
      sendData.name = "None";
    }

    // メッセージを1000文字以内に制限
    sendData.message = sendData.message.substring(0, 1000);

    // メッセージが空の場合は"None"に設定
    if (sendData.message === "") {
      sendData.message = "None";
    }

    try {
      // データを送信
      const res = await fetch("https://tori-tori-tori.deno.dev/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (res.ok) {
        setSuccess(true); // 成功状態を設定
        setError("");
        setFormData({ name: "", email: "", message: "" }); // フィールドをリセット
      } else {
        setError("送信に失敗しました。後ほど再度お試しください。");
      }
    } catch (_) {
      setError("送信に失敗しました。後ほど再度お試しください。");
    }

    if (buttonRef.current) {
      buttonRef.current.disabled = false; // ボタンを有効化
    }
  };

  return (
    <>
      {/* ヘッダー部分 */}
      <Halo links={links} />

      {/* ページ内容 */}
      <Page>
        <h1>お問い合わせ</h1> {/* ページタイトル */}

        {/* お問い合わせフォーム */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            お名前
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            メールアドレス*
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            問い合わせ内容
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button ref={buttonRef} type="submit">送信</button>

          {/* エラーメッセージ表示 */}
          {error && <p className="contact-error">{error}</p>}

          {/* 成功メッセージ表示 */}
          {success && <p className="contact-success">送信が完了しました。</p>}
        </form>
        <div className="bottom">
          <div className="center">
            <Link to="/">{">>>ホームに戻る"}</Link>
          </div>
        </div>
      </Page>
    </>
  );
}
