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
  const [statusFilter, setStatusFilter] = useState(null);

  const fetchMails = async (filterStatus = null) => {
    setLoading(true);
    try {
      const variables = {
        limit: 50,
        ...(filterStatus !== null && {
          filter: {
            fg_attachments: { eq: filterStatus }
          }
        })
      };
      const response = await API.graphql({
        query: listMails,
        variables,
        authMode: 'apiKey',
      });

      const mails = response.data.listMails.items || [];
      setMails(mails);
    } catch (error) {
      console.error('取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMails(statusFilter);
  }, [statusFilter]);

  return (
    <main>
      <h1>メール一覧</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setStatusFilter(null)}>すべて</button>
        <button onClick={() => setStatusFilter("0")}>添付ファイルなし</button>
        <button onClick={() => setStatusFilter("1")}>添付ファイル付き</button>
      </div>

      {loading ? <p>読み込み中...</p> : <MailList mails={mails} />}
    </main>
  );

}