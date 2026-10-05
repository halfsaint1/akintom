import nodemailer from "nodemailer";

const config = {
  to: process.env.MAIL_TO ?? "info@akintomglobalresources.com",
  from: process.env.MAIL_FROM ?? "info@akintomglobalresources.com",
  host: process.env.SMTP_HOST ?? "smtp.purelymail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  user: process.env.SMTP_USER ?? "info@akintomglobalresources.com",
  pass: process.env.SMTP_PASS,
};

if (!config.pass || config.pass === "your-purelymail-password") {
  console.error(
    "Missing SMTP_PASS. Add your PurelyMail password to .env.local, then run:\n  npm run mail:test",
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  requireTLS: !config.secure,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

try {
  await transporter.verify();
  console.log("SMTP connection verified.");

  const info = await transporter.sendMail({
    from: `"Akintom Global Resources" <${config.from}>`,
    to: config.to,
    subject: "Akintom form mail test",
    text: [
      "This is a test message from the Akintom website.",
      "",
      "If you received this, contact and application forms are ready to deliver to this inbox.",
    ].join("\n"),
  });

  console.log("Test email sent:", info.messageId);
} catch (error) {
  console.error("Mail test failed:", error);
  process.exit(1);
}
