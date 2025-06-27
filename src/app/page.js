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

  return (
    <main>
      <h1>メール一覧</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter(null)}>メールをすべて表示</button>
        <button onClick={() => setFilter({ fg_attachments: { eq: '0' } })}>添付ファイルなし</button>
        <button onClick={() => setFilter({ fg_attachments: { eq: '1' } })}>添付ファイル付き</button>
        <button onClick={() => setFilter({ fg_unzipped: { eq: '1' } })}>zip解凍済み</button>
      </div>

      {loading ? <p>読み込み中...</p> : <MailList mails={mails} />}
    </main>
  );

}