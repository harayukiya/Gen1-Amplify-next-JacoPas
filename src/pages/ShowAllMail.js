"use client";

import { useState, useEffect } from "react";
import { fetchAllMail } from "@api/fetchAllMail";

export default function ShowMailAll({ onNavigate }) {
  const [mails, setMails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const response = await fetchAllMail();
        console.log(response);
        setMails(response);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

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
        </>
      )}
    </div>
  );
}