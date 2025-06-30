import MailItem from '@/components/Mail/MailItem';

export default function MailList({ mails, handleSelect }) {
  if (!mails || mails.length === 0) {
    return <div>メールはありません。</div>;
  }

  return (
    <div className="scroll-table-container">
      <table className="scroll-table table-header">
        <thead>
          <tr>
            <th>送信</th>
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
      </table>
      <div className="scroll-body">
        <table className="scroll-table table-body">
          <tbody>
            {mails.map((mail) => (
              <MailItem key={mail.id_mail} mail={mail} handleSelect={handleSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
