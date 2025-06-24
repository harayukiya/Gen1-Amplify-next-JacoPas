"use client";

import { useState, useEffect } from "react";
import { fetchOneMail } from "@api/fetchOneMail";

export default function ShowOneMail({ onNavigate }) {
    const [mail, setMail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchOneMail("ka0vnma3bm7q5vk8nriemn2pc602m92ijs5pl901", "2025-06-18 10:53:14");
                setMail(response);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div>
            <button onClick={() => onNavigate("home")}>homeに戻る</button>
            <p>Loading...</p>
        </div>
    );
    if (!mail) return (
        <div>
            <button onClick={() => onNavigate("home")}>homeに戻る</button>
            <p>該当メールなし</p>
        </div>
    );

    return (
        <div>
            <button onClick={() => onNavigate("home")}>homeに戻る</button>
            <h1>メールの中身</h1>
            <table>
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
              <tbody>
                    <tr>
                      <td>{mail.id_mail}</td>
                      <td>{mail.st_touser}</td>
                      <td>{mail.st_ccuser}</td>
                      <td>{mail.st_subject}</td>
                      <td>{mail.st_contents}</td>
                      <td className="show-vertical">
                        {Object.entries(JSON.parse(mail.st_attachments)).map(([pdfName, s3URL]) => (
                            <a href={s3URL} key={pdfName} >
                                {pdfName}
                            </a>
                        ))}
                      </td>
                      <td>{mail.dt_receive}</td>
                      <td>{mail.dt_insert}</td>
                      <td>{mail.dt_update}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}