import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '@/aws-exports';

Amplify.configure(config);
const API = generateClient();

import { getMail } from "@graphql/queries";


export async function fetchOneMail(id_mail, dt_receive) {
    const variables = {id_mail, dt_receive};
    try {
        const data = await API.graphql({
            query : getMail,
            variables : variables
        });
        return data.data.getMail;
    } catch (err) {
        console.error("メールデータの取得に失敗:", err);
    }
}