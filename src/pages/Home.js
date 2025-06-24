"use client";

import homeStyles from "@css/home.module.css";

export default function Home({ onNavigate }) {
  return (
    <div className={homeStyles.container}>
      <h1>ホームページ</h1>
      <button className={homeStyles.button} onClick={() => onNavigate("showOneMail")}>メールデータを一個見る</button>
      <button className={homeStyles.button} onClick={() => onNavigate("showAllMail")}>DynamoDBのデータを見る</button>
    </div>
  );
}