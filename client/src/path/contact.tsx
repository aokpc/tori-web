import React from "react";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Halo, links, Page } from "./base.tsx";

import "./contact.css";

/**
 * メンバー紹介ページのコンポーネント
 */
export function Contacts() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (sendData.name === "") {
      sendData.name = "None";
    }
    sendData.message = sendData.message.substring(0, 1000); // メッセージは1000文字まで
    if (sendData.message === "") {
      sendData.message = "None"; // メッセージが空なら削除
    }
    try {
      const res = await fetch("https://tori-tori-tori.deno.dev/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      if (res.ok) {
        setSuccess(true);
        setError("");
        setFormData({ name: "", email: "", message: "" }); // フィールドをリセット
      } else {
        setError("送信に失敗しました。後ほど再度お試しください。");
      }
    } catch (error) {
      setError("送信に失敗しました。後ほど再度お試しください。");
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false; // ボタンを無効化
    }
  };

  return (
    <>
      <Halo links={links} />
      <Page>
        <h1>お問い合わせ</h1>
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
          {error && <p className="contact-error">{error}</p>}
          {success && <p className="contact-success">送信が完了しました。</p>}
        </form>
      </Page>
    </>
  );
}
