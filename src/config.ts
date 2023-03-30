export default {
  mailer: {
    host: process.env.MAILER_HOST || "smtp.gmail.com",
    port: process.env.MAILER_PORT || 587,
    user: process.env.MAILER_USER || "test",
    pass: process.env.MAILER_PASS || "test",
  },
  aws: {
    bucket: process.env.AWS_BUCKET_NAME as string,
    cdn: process.env.AWS_CDN as string
  },
  jwt: process.env.SECRET_KEY as string
};
