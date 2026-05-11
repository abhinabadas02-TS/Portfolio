import nodemailer from "nodemailer";

// Create transporter (lazy — only when actually needed)
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use Gmail App Password
    },
  });
};

/**
 * Send notification email to portfolio owner when someone
 * submits the contact form.
 */
export const sendContactNotification = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log("⚠️  Email not configured — skipping notification.");
    return false;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Courier New', monospace; background: #050508; color: #f0f0f5; padding: 0; margin: 0; }
        .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
        .header { border-bottom: 1px solid #00e5ff33; padding-bottom: 20px; margin-bottom: 28px; }
        .tag { font-size: 11px; letter-spacing: 3px; color: #00e5ff; text-transform: uppercase; }
        .title { font-size: 28px; color: #f0f0f5; margin: 8px 0 0; letter-spacing: 2px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 10px; letter-spacing: 2px; color: #6b6b80; text-transform: uppercase; margin-bottom: 4px; }
        .value { font-size: 14px; color: #f0f0f5; padding: 10px 14px; border: 1px solid #3a3a50; background: #0a0a0f; }
        .message-box { padding: 16px; border: 1px solid #3a3a50; background: #0a0a0f; font-size: 14px; line-height: 1.7; color: #c0c0d0; white-space: pre-wrap; }
        .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #3a3a50; font-size: 11px; color: #6b6b80; }
        .cyan { color: #00e5ff; }
        .magenta { color: #ff2d78; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="tag">Portfolio — New Message</div>
          <div class="title">CONTACT <span class="cyan">RECEIVED</span></div>
        </div>
        <div class="field">
          <div class="label">From</div>
          <div class="value">${name} &lt;${email}&gt;</div>
        </div>
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${subject || "No subject"}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${message}</div>
        </div>
        <div class="footer">
          Sent via <span class="cyan">abhinabadas.dev</span> · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST<br/>
          Reply directly to <span class="magenta">${email}</span>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html,
    });
    console.log(`📧 Notification sent for message from ${email}`);
    return true;
  } catch (err) {
    // Don't crash the app if email fails — it's a nice-to-have
    console.error("⚠️  Email send failed:", err.message);
    return false;
  }
};