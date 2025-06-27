export default function MailItem({ mail }) {
  return (
    <tr>
      <td>{mail.id_mail}</td>
      <td>{mail.st_fromaddress}</td>
      <td>{mail.st_touser}</td>
      <td>{mail.st_ccuser}</td>
      <td>{mail.st_subject}</td>
      <td>{mail.st_contents}</td>
      <td>{mail.fg_attachments}</td>
      {/* <td>{mail.st_attachments}</td> */}
      <td>添付ファイル</td>
      <td>{mail.fg_unzipped}</td>
      <td>{mail.st_password}</td>
      {/* <td>{mail.st_objectkeys}</td> */}
      <td>S3オブジェクトキー</td>
      <td>{mail.dt_receive}</td>
      <td>{mail.dt_insert}</td>
      <td>{mail.dt_update}</td>
    </tr>
  );
}
