import nodemailer from "nodemailer";

// =====================================
// SMTP CONFIG
// =====================================

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE) === "true";

const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

if (!smtpHost) {
  throw new Error("SMTP_HOST is not configured");
}

if (!smtpUser) {
  throw new Error("SMTP_USER is not configured");
}

if (!smtpPassword) {
  throw new Error("SMTP_PASSWORD is not configured");
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,

  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

// =====================================
// VERIFY SMTP
// =====================================

transporter.verify((error) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

// =====================================
// SEND MAIL
// =====================================

export const sendMail = async ({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  return await transporter.sendMail({
    from: process.env.MAIL_FROM || smtpUser,

    to,

    subject,

    html,

    ...(replyTo ? { replyTo } : {}),
  });
};