// import nodemailer from "nodemailer";

// // Create transporter (lazy — only when actually needed)
// const createTransporter = () => {
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     return null;
//   }

//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, // Use Gmail App Password
//     },
//   });
// };

// /**
//  * Send notification email to portfolio owner when someone
//  * submits the contact form.
//  */
// export const sendContactNotification = async ({ name, email, subject, message }) => {
//   const transporter = createTransporter();

//   if (!transporter) {
//     console.log("⚠️  Email not configured — skipping notification.");
//     return false;
//   }

//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { font-family: 'Courier New', monospace; background: #050508; color: #f0f0f5; padding: 0; margin: 0; }
//         .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
//         .header { border-bottom: 1px solid #00e5ff33; padding-bottom: 20px; margin-bottom: 28px; }
//         .tag { font-size: 11px; letter-spacing: 3px; color: #00e5ff; text-transform: uppercase; }
//         .title { font-size: 28px; color: #f0f0f5; margin: 8px 0 0; letter-spacing: 2px; }
//         .field { margin-bottom: 20px; }
//         .label { font-size: 10px; letter-spacing: 2px; color: #6b6b80; text-transform: uppercase; margin-bottom: 4px; }
//         .value { font-size: 14px; color: #f0f0f5; padding: 10px 14px; border: 1px solid #3a3a50; background: #0a0a0f; }
//         .message-box { padding: 16px; border: 1px solid #3a3a50; background: #0a0a0f; font-size: 14px; line-height: 1.7; color: #c0c0d0; white-space: pre-wrap; }
//         .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #3a3a50; font-size: 11px; color: #6b6b80; }
//         .cyan { color: #00e5ff; }
//         .magenta { color: #ff2d78; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <div class="tag">Portfolio — New Message</div>
//           <div class="title">CONTACT <span class="cyan">RECEIVED</span></div>
//         </div>
//         <div class="field">
//           <div class="label">From</div>
//           <div class="value">${name} &lt;${email}&gt;</div>
//         </div>
//         <div class="field">
//           <div class="label">Subject</div>
//           <div class="value">${subject || "No subject"}</div>
//         </div>
//         <div class="field">
//           <div class="label">Message</div>
//           <div class="message-box">${message}</div>
//         </div>
//         <div class="footer">
//           Sent via <span class="cyan">abhinabadas.dev</span> · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST<br/>
//           Reply directly to <span class="magenta">${email}</span>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     await transporter.sendMail({
//       from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_TO || process.env.EMAIL_USER,
//       replyTo: email,
//       subject: `[Portfolio] New message from ${name}`,
//       html,
//     });
//     console.log(`📧 Notification sent for message from ${email}`);
//     return true;
//   } catch (err) {
//     // Don't crash the app if email fails — it's a nice-to-have
//     console.error("⚠️  Email send failed:", err.message);
//     return false;
//   }
// };




























import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────
//  HOW THE EMAIL FLOW WORKS:
//
//  Recruiter fills form → submits their email (e.g. hr@company.com)
//        ↓
//  Backend saves to MongoDB
//        ↓
//  Nodemailer sends a notification TO you (EMAIL_TO in .env)
//  The notification shows the recruiter's details
//  replyTo is set to the recruiter's email → so when YOU click
//  Reply in Gmail, it goes directly back to the recruiter.
//
//  .env required:
//    EMAIL_USER = abhinabadas02@gmail.com   ← your Gmail (sender)
//    EMAIL_PASS = xxxx xxxx xxxx xxxx       ← Gmail App Password (16 chars, spaces ok)
//    EMAIL_TO   = abhinabadas02@gmail.com   ← where YOU receive notifications
// ─────────────────────────────────────────────────────────────

const createTransporter = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) {
    console.warn("⚠️  EMAIL_USER or EMAIL_PASS not set in .env — email notifications disabled.");
    return null;
  }

  return nodemailer.createTransport({
    // Use explicit Gmail SMTP instead of service:"gmail"
    // — more reliable and works with App Passwords
    host: "smtp.gmail.com",
    port: 465,
    secure: true,          // SSL on port 465
    auth: {
      user,
      pass,                // Must be a Gmail App Password, NOT your account password
    },
    // Increase timeout for slow connections
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });
};

// ─────────────────────────────────────────────────────────────
//  Verify SMTP connection on startup (call this once in server.js)
// ─────────────────────────────────────────────────────────────
export const verifyMailer = async () => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    await transporter.verify();
    console.log("📧 Mailer verified — Gmail SMTP ready");
  } catch (err) {
    console.error("❌ Mailer verification failed:", err.message);
    console.error("   → Check EMAIL_USER and EMAIL_PASS in your .env");
    console.error("   → Make sure you are using a Gmail APP PASSWORD, not your account password");
    console.error("   → Get one at: https://myaccount.google.com/apppasswords");
  }
};

// ─────────────────────────────────────────────────────────────
//  Send notification to YOU when a recruiter submits the form
//
//  @param {string} name       - Recruiter's name
//  @param {string} email      - Recruiter's email (used as replyTo)
//  @param {string} subject    - Form subject
//  @param {string} message    - Form message
// ─────────────────────────────────────────────────────────────
export const sendContactNotification = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log("⚠️  Skipping email — transporter not configured.");
    return false;
  }

  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Sanitize message for HTML display (prevent injection)
  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Courier New',monospace;background:#050508;color:#f0f0f5;padding:0}
  .wrap{max-width:580px;margin:0 auto;padding:40px 24px}
  .header{border-bottom:2px solid #00e5ff22;padding-bottom:24px;margin-bottom:32px}
  .logo{font-size:10px;letter-spacing:4px;color:#00e5ff;text-transform:uppercase;margin-bottom:10px}
  .title{font-size:26px;color:#f0f0f5;letter-spacing:3px;font-weight:bold}
  .title span{color:#00e5ff}
  .badge{display:inline-block;padding:3px 10px;border:1px solid #00e5ff33;font-size:10px;letter-spacing:2px;color:#00e5ff;margin-top:8px}
  .section{margin-bottom:24px}
  .label{font-size:9px;letter-spacing:3px;color:#6b6b80;text-transform:uppercase;margin-bottom:6px}
  .value{font-size:13px;color:#f0f0f5;padding:12px 16px;border:1px solid #3a3a50;background:#0d0d18;line-height:1.5}
  .value a{color:#00e5ff;text-decoration:none}
  .msg-box{padding:16px;border:1px solid #3a3a50;background:#0d0d18;font-size:13px;line-height:1.8;color:#c0c0d0;white-space:pre-wrap;border-left:3px solid #00e5ff}
  .reply-cta{margin:28px 0;padding:16px 20px;border:1px solid #00e5ff33;background:#00e5ff08;text-align:center}
  .reply-cta p{font-size:11px;letter-spacing:1px;color:#6b6b80;margin-bottom:8px}
  .reply-cta a{display:inline-block;padding:10px 24px;border:1px solid #00e5ff;color:#00e5ff;font-size:11px;letter-spacing:2px;text-decoration:none;text-transform:uppercase}
  .footer{padding-top:20px;border-top:1px solid #1a1a2e;font-size:10px;color:#6b6b80;line-height:1.8}
  .cyan{color:#00e5ff}
  .magenta{color:#ff2d78}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">abhinabadas.dev — Portfolio</div>
    <div class="title">NEW <span>MESSAGE</span> RECEIVED</div>
    <div class="badge">● UNREAD</div>
  </div>

  <div class="section">
    <div class="label">From (Recruiter)</div>
    <div class="value">
      <strong style="color:#f0f0f5">${name}</strong><br/>
      <a href="mailto:${email}">${email}</a>
    </div>
  </div>

  <div class="section">
    <div class="label">Subject</div>
    <div class="value">${subject || "No subject provided"}</div>
  </div>

  <div class="section">
    <div class="label">Message</div>
    <div class="msg-box">${safeMessage}</div>
  </div>

  <div class="reply-cta">
    <p>Click Reply in your Gmail to respond directly to ${name}</p>
    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your message")}">
      Reply to ${name} →
    </a>
  </div>

  <div class="footer">
    Received at <span class="cyan">${receivedAt} IST</span><br/>
    Sent via your portfolio contact form<br/>
    Recruiter email: <span class="magenta">${email}</span>
  </div>
</div>
</body>
</html>`;

  const to = process.env.EMAIL_TO?.trim() || process.env.EMAIL_USER?.trim();

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER?.trim()}>`,
      to,                    // ← YOUR email — where YOU receive the notification
      replyTo: email,        // ← RECRUITER's email — clicking Reply goes to them
      subject: `[Portfolio] New message from ${name} — ${subject || "No subject"}`,
      html,
      // Plain text fallback
      text: `New portfolio message\n\nFrom: ${name} <${email}>\nSubject: ${subject || "No subject"}\n\nMessage:\n${message}\n\n---\nReceived: ${receivedAt} IST`,
    });

    console.log(`📧 Notification sent → ${to} | MessageId: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error("❌ Email send failed:", err.message);

    // Specific helpful error messages
    if (err.code === "EAUTH") {
      console.error("   → Gmail authentication failed.");
      console.error("   → Make sure EMAIL_PASS is a 16-char App Password from:");
      console.error("   → https://myaccount.google.com/apppasswords");
    } else if (err.code === "ECONNECTION") {
      console.error("   → Could not connect to Gmail SMTP. Check network/firewall.");
    }

    return false;
  }
};