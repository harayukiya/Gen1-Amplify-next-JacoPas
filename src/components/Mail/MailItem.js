export default function MailItem({ mail, handleSelect }) {
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={() => handleSelect(mail.id_mail)}/>
      </td>
      <td>{mail.id_mail}</td>
      <td>{mail.st_fromaddress}</td>
      <td>{mail.st_touser}</td>
      <td>{mail.st_ccuser}</td>
      <td>{mail.st_subject}</td>
      <td>{mail.st_contents}</td>
      <td>{mail.fg_attachments}</td>
      <td className="show-vertical">
        {mail.fg_attachments === "1" ? (
          Object.entries(JSON.parse(mail.st_attachments)).map(([pdfName, s3url]) => (
            <a key={pdfName} href={s3url} target="_blank">
              {pdfName}
            </a>
          ))
        ) : (
          ""
        )}
      </td>
      <td>{mail.fg_unzipped}</td>
      <td>{mail.st_password}</td>
      <td>
        {mail.fg_attachments === "1" ? (
          Object.entries(JSON.parse(mail.st_objectkeys)).map(([pdfName, s3Key]) => (
            <div key={pdfName}>{pdfName} : {s3Key}</div>
          ))
        ) : (
          ""
        )}
      </td>
      <td>{mail.dt_receive}</td>
      <td>{mail.dt_insert}</td>
      <td>{mail.dt_update}</td>
    </tr>
  );
}
