"use client";

import { useState, useEffect } from "react";
import { fetchAllMail } from "@api/fetchAllMail";

export default function ShowMailAll({ onNavigate }) {
  const [mails, setMails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const response = await fetchAllMail();
        setMails(response);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleSelect = (id_mail) => {
    setSelectedIds((prev_id_mails) =>
      prev_id_mails.includes(id_mail) ? prev_id_mails.filter((mail) => mail !== id_mail) : [...prev_id_mails, id_mail]
    );
  };

  const handleSubmit = async () => {
    const query = selectedIds.join(",");
    const url = `https://auiy4zpd02.execute-api.ap-northeast-1.amazonaws.com/default/abic-main-ope-lambda-email-sending01?id=${query}`;
    console.log("Generated URL: ", url); // デバッグ用
    try {
      const response = await fetch(url, {
        method: "GET", // 必要に応じて適切なHTTPメソッドに変更
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json(); // JSONデータを取得
        setResponseMessage(JSON.stringify(json, null, 2)); // レスポンスを文字列化して保存
      } else {
        setResponseMessage(`エラー: ${response.status} - ${response.statusText}`); // エラーを保存
      }
    } catch (error) {
      setResponseMessage(`エラー: ${error.message}`); // ネットワークエラーなどの処理
    }
  };

  if (!mails) return (
      <div>
          <button onClick={() => onNavigate("home")}>homeに戻る</button>
          <p>メールが取得できていません。</p>
      </div>
  );

  return (
    <div>
    <button onClick={() => onNavigate("home")}>homeに戻る</button>
      <h1>データ一覧</h1>
        {loading ? (
          <p>データ取得中...</p>
        ) : (
          <>
            <div className="scroll-table-container">
              <table className="scroll-table table-header">
                <thead>
                  <tr>
                    <th>送信チェック</th>
                    <th>ID</th>
                    <th>TOユーザ</th>
                    <th>CCユーザ</th>
                    <th>件名</th>
                    <th>本文</th>
                    <th>添付ファイル</th>
                    <th>受信時間</th>
                    <th>登録時間</th>
                    <th>更新時間</th>
                  </tr>
                </thead>
              </table>

              <div className="scroll-body">
                <table className="scroll-table table-body">
                  <tbody>
                    {mails.map((mail, index) => (
                      <tr key={index}>
                        <td>
                            <input type="checkbox" onChange={() => handleSelect(mail.id_mail)}/>
                        </td>
                        <td>{mail.id_mail}</td>
                        <td>{mail.st_touser}</td>
                        <td>{mail.st_ccuser}</td>
                        <td>{mail.st_subject}</td>
                        <td>{mail.st_contents}</td>
                        <td>
                          {Object.entries(JSON.parse(mail.st_attachments)).map(([pdfName, s3url]) => (
                            <a key={pdfName} href={s3url} target="_blank">
                              {pdfName}
                            </a>
                          ))}
                        </td>
                        <td>{mail.dt_receive}</td>
                        <td>{mail.dt_insert}</td>
                        <td>{mail.dt_update}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
            <button onClick={handleSubmit}>送信</button>
        </>
      )}
    </div>
  );
}