import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '@/aws-exports';

Amplify.configure(config);
const API = generateClient();

import { listMails } from "@graphql/queries";


export async function fetchAllMail() {
    try {
        const data = await API.graphql({
            query : listMails,
            authMode: "apiKey"
        });
        return data.data.listMails;
    } catch (err) {
        console.error("メールデータの取得に失敗:", err);
    }
}