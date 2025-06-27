export default function MailItem({ mail }) {
  return (
    <tr>
      <td>{mail.id_mail}</td>
      <td>{mail.st_subject}</td>
      <td>{mail.st_fromAdress}</td>
      <td>{mail.dt_receive}</td>
    </tr>
  );
}
