import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_UKRNET_USER,
    pass: process.env.SMTP_UKRNET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ігнорувати перевірку сертифікату
  },
});

export async function sendMail({ to, html, subject }) {
  await transporter.sendMail({
    from: process.env.SMTP_UKRNET_USER,
    to: to,
    subject: subject,
    html: html,
  });
}
