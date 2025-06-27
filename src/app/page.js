'use client';
//React FW機能定義
import { useEffect, useState } from 'react';

//graphQL APIの機能定義
import API from "@app/APIConfig";

import MailList from "@components/MailList";
import {listMails} from "@graphql/queries";

export default function HomePage() {
    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMails = async () => {
        try {
            const result = await API.graphql({
                query : listMails,
                authMode: "apiKey"
            });
            console.log("result");
            console.log(result)
            setMails(result.data.listMails);
            console.log("mails : ");
            console.log(mails);
        } catch (error) {
            console.error('メール取得エラー:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchMails();
    }, []);


  return (
    <main>
      <MailList mails={mails} />
    </main>
  );
}