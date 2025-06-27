import MailItem from '@components/MailItem';

export default function MailList({ mails }) {
  if (!mails || mails.length === 0) {
    return <div>メールはありません。</div>;
  }

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>件名</th>
          <th>送信者</th>
          <th>受信日</th>
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
