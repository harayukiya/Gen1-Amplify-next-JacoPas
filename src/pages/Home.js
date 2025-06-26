"use client";

import homeStyles from "@css/home.module.css";

export default function Home({ onNavigate }) {
  return (
    <div className={homeStyles.container}>
      <h1>ホームページ</h1>
      <button className={homeStyles.button} onClick={() => onNavigate("showOneMail")}>メールデータを一個見る</button>
      <button className={homeStyles.button} onClick={() => onNavigate("showAllMail")}>メールデータを全て見る</button>
      <button className={homeStyles.button} onClick={() => onNavigate("showAllMailWithSend")}>メールデータを全て見る（送信）</button>
      <button className={homeStyles.button} onClick={() => onNavigate("showAllMailWithSelectedSend")}>メールデータを全て見る（選択送信）</button>
    </div>
  );
}