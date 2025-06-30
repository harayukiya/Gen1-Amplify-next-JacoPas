'use client';
//React FW機能定義
import { useEffect, useState } from 'react';

//graphQL APIの機能定義
import API from "@app/APIConfig";

import MailList from "@components/Mail/MailList";
import {listMails} from "@graphql/queries";

export default function HomePage() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const fetchMails = async () => {
    setLoading(true);
    try {
      const response = await API.graphql({
        query: listMails,
        variables: {
          filter,
          limit: 100
        },
        authMode: 'apiKey',
      });

      const mails = response.data.listMails.items || [];
      setMails(mails);
      console.log(mails);
    } catch (error) {
      console.error('取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  //メール取得を行うまた、フィルタを変更した際にもメール取得を行う
  useEffect(() => {
    fetchMails();
  }, [filter]);

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

      console.log("レスポンス");
      console.log(response);
      console.log(response.ok);

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

  return (
    <main id='common'>
      <div style={{ marginBottom: '1rem' }}>
        <button className='clickButton' onClick={() => setFilter(null)}>メールをすべて表示</button>
        <button className='clickButton' onClick={() => setFilter({ fg_attachments: { eq: '0' } })}>添付ファイルなし</button>
        <button className='clickButton' onClick={() => setFilter({ fg_attachments: { eq: '1' } })}>添付ファイル付き</button>
        <button className='clickButton' onClick={() => setFilter({ fg_unzipped: { eq: '1' } })}>zip解凍済み</button>
      </div>

      {loading ? <p>読み込み中...</p> : <MailList mails={mails} handleSelect={handleSelect} />}
      <button onClick={handleSubmit}>送信</button>
    </main>
  );

}