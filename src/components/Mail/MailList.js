import MailItem from '@/components/Mail/MailItem';

export default function MailList({ mails }) {
  if (!mails || mails.length === 0) {
    return <div>メールはありません。</div>;
  }

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>送信者</th>
          <th>受信者(TO)</th>
          <th>受信者(CC)</th>
          <th>件名</th>
          <th>本文</th>
          <th>添付フラグ</th>
          <th>添付ファイル</th>
          <th>解凍済み</th>
          <th>パスワード</th>
          <th>S3キー</th>
          <th>受信時間</th>
          <th>挿入時間</th>
          <th>更新時間</th>
        </tr>
      </thead>
      <tbody>
        {mails.map((mail) => (
          <MailItem key={mail.id_mail} mail={mail} />
        ))}
      </tbody>
    </table>
  );
}
