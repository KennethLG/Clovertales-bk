// env variables
export default {
  mailer: {
    host: process.env.MAILER_HOST || "smtp.gmail.com",
    port: parseInt(process.env.MAILER_PORT || "587"),
    user: process.env.MAILER_USER || "test",
    pass: process.env.MAILER_PASS || "test",
    dest: process.env.MAILER_DEST || "",
  },
  aws: {
    bucket: process.env.AWS_BUCKET_NAME as string,
    cdn: process.env.AWS_CDN as string,
  },
  jwt: process.env.SECRET_KEY as string,
  pass: process.env.SECRET_PASS as string,
  allowedIp: process.env.ALLOWED_IP as string,
  trello: {
    getCard: process.env.TRELLO_GET_CARD as string,
    getCardAttachments: process.env.TRELLO_GET_CARD_ATTACHMENTS as string,
    apiKey: process.env.TRELLO_API_KEY as string,
    token: process.env.TRELLO_TOKEN as string
  }
};
