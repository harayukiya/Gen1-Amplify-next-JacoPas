const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'ap-northeast-1' });
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const input = event.input;
  const fromAddress = "jacopas@abic.co.jp"
  const mailBucket = 'ope.mail.abiccontents.com';

  if (!input) {
    throw new Error("No input provided.");
  }

  const { subject, body, toAddress, attachmentsKeys } = input;
  const attachments = await Promise.all(
    attachmentsKeys.map(async (attachmentsKey) => {
      const pdfFile = await s3
        .getObject({ Bucket: mailBucket, Key: attachmentsKey })
        .promise();

      return {
        filename: attachmentsKey.split("/").pop(),
        content: pdfFile.Body.toString("base64"), // SESはBase64が必要
        contentType: "application/pdf",
      };
    })
  );
  
  // MIME メールを組み立て
  const rawMessage = buildRawEmail({
    from: fromAddress,
    to: toAddress,
    subject,
    body,
    attachments,
  });

  await ses
    .sendRawEmail({
      RawMessage: { Data: rawMessage },
    })
    .promise();

  return "メール送信完了";
};

// 添付付きメールを構築
function buildRawEmail({ from, to, subject, body, attachments }) {
  const boundary = `----=_Boundary_${Date.now()}`;;
  let raw = "";

  raw += `From: ${from}\n`;
  raw += `To: ${to}\n`;
  raw += `Subject: ${subject}\n`;
  raw += `MIME-Version: 1.0\n`;
  raw += `Content-Type: multipart/mixed; boundary="${boundary}"\n\n`;

  // メール本文
  raw += `--${boundary}\n`;
  raw += `Content-Type: text/plain; charset=UTF-8\n\n`;
  raw += `${body}\n\n`;

  // 添付ファイル
  for (const attachment of attachments) {
    raw += `--${boundary}\n`;
    raw += `Content-Type: ${attachment.contentType}; name="${attachment.filename}"\n`;
    raw += "Content-Transfer-Encoding: base64\n";
    raw += `Content-Disposition: attachment; filename="${attachment.filename}"\n\n`;
    raw += `${attachment.content}\n\n`;
  }

  raw += `--${boundary}--`;

  return raw;
}