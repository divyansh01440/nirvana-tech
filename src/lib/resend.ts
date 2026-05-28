// =============================================================================
// 📧 NIRVANA TECH — Resend Email Helper
// =============================================================================

import { Resend } from "resend";
import { CONTACT_INFO } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@nirvanatechsolution.xyz";
const FROM_NAME = "Nirvana Tech Solutions";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || CONTACT_INFO.email;

// =============================================================================
// 📧 TYPES
// =============================================================================

interface QueryEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  queryId: string;
}

// =============================================================================
// 📧 TEMPLATES
// =============================================================================

function clientConfirmationTemplate(data: QueryEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#F5F5F5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.02em;">
        <span style="color:#F5F5F5;">NIRVANA</span>
        <span style="color:#D4AF37;font-size:12px;letter-spacing:0.2em;margin-left:4px;">TECH</span>
      </h1>
    </div>

    <!-- Card -->
    <div style="background:#0B1020;border:1px solid rgba(212,175,55,0.2);border-radius:24px;padding:40px;text-align:center;">
      
      <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:#D4AF37;line-height:64px;font-size:32px;color:#050505;margin-bottom:24px;">✓</div>
      
      <h2 style="margin:0 0 16px 0;font-size:28px;font-weight:700;color:#F5F5F5;">
        Thanks, ${data.name} ✨
      </h2>
      
      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#A1A1AA;">
        We've received your project inquiry and we're already excited.<br>
        A real human will respond within <strong style="color:#D4AF37;">24 hours</strong>.
      </p>

      <!-- Summary -->
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:24px;text-align:left;margin-top:24px;">
        <div style="font-size:11px;color:#D4AF37;text-transform:uppercase;letter-spacing:0.3em;margin-bottom:12px;">── Your Inquiry</div>
        ${data.service ? `<p style="margin:0 0 8px 0;font-size:14px;color:#E4E4E7;"><strong>Service:</strong> ${data.service}</p>` : ""}
        ${data.budget ? `<p style="margin:0 0 8px 0;font-size:14px;color:#E4E4E7;"><strong>Budget:</strong> ${data.budget}</p>` : ""}
        ${data.timeline ? `<p style="margin:0 0 8px 0;font-size:14px;color:#E4E4E7;"><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
        <p style="margin:8px 0 0 0;font-size:13px;line-height:1.6;color:#A1A1AA;">${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>

    <!-- What's next -->
    <div style="margin-top:32px;padding:24px;background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.2);border-radius:16px;">
      <h3 style="margin:0 0 12px 0;font-size:16px;color:#F5F5F5;">What happens next?</h3>
      <ol style="margin:0;padding-left:20px;color:#A1A1AA;font-size:14px;line-height:1.8;">
        <li>We'll review your inquiry within 24 hours</li>
        <li>We'll reach out to schedule a free 30-min discovery call</li>
        <li>After the call, you'll get a detailed proposal</li>
      </ol>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);color:#52525B;font-size:12px;">
      <p style="margin:0 0 8px 0;">Nirvana Tech Solutions</p>
      <p style="margin:0;">${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.country}</p>
      <p style="margin:16px 0 0 0;font-family:monospace;font-size:10px;color:#3F3F46;">Reference: ${data.queryId}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function adminNotificationTemplate(data: QueryEmailData): string {
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/nirvana-tech-admin/queries/${data.queryId}`;

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#050505;font-family:-apple-system,sans-serif;color:#F5F5F5;">
  <div style="max-width:600px;margin:0 auto;">
    
    <div style="background:#0B1020;border:2px solid #D4AF37;border-radius:16px;padding:32px;">
      
      <div style="display:inline-block;padding:6px 12px;background:#D4AF37;color:#050505;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:16px;">🔔 New Inquiry</div>
      
      <h2 style="margin:0 0 24px 0;font-size:24px;color:#F5F5F5;">
        ${data.name} wants to work with you.
      </h2>

      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Name:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${data.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Email:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><a href="mailto:${data.email}" style="color:#3B82F6;">${data.email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Phone:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><a href="tel:${data.phone}" style="color:#3B82F6;">${data.phone}</a></td></tr>
        ${data.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Company:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${data.company}</td></tr>` : ""}
        ${data.service ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Service:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${data.service}</td></tr>` : ""}
        ${data.budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Budget:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${data.budget}</td></tr>` : ""}
        ${data.timeline ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><strong style="color:#D4AF37;">Timeline:</strong></td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">${data.timeline}</td></tr>` : ""}
      </table>

      <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;">
        <div style="font-size:11px;color:#D4AF37;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">Message</div>
        <p style="margin:0;color:#E4E4E7;font-size:14px;line-height:1.6;">${data.message.replace(/\n/g, "<br>")}</p>
      </div>

      <a href="${adminUrl}" style="display:block;margin-top:24px;padding:14px;background:linear-gradient(135deg,#D4AF37,#3B82F6);color:#050505;text-align:center;text-decoration:none;border-radius:999px;font-weight:700;">
        Open in Admin Dashboard →
      </a>
    </div>

    <p style="text-align:center;margin-top:16px;color:#52525B;font-size:11px;font-family:monospace;">
      Query ID: ${data.queryId}
    </p>
  </div>
</body>
</html>
  `;
}

function otpTemplate(code: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your login code</title></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#F5F5F5;">
  <div style="max-width:480px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;">
        <span style="color:#F5F5F5;">NIRVANA</span>
        <span style="color:#D4AF37;font-size:11px;letter-spacing:0.2em;margin-left:4px;">TECH</span>
      </h1>
    </div>

    <!-- Card -->
    <div style="background:#0B1020;border:1px solid rgba(212,175,55,0.25);border-radius:24px;padding:40px;text-align:center;">
      
      <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.4);line-height:56px;font-size:24px;margin-bottom:24px;">🔐</div>

      <h2 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#F5F5F5;">Your login code</h2>
      <p style="margin:0 0 32px 0;font-size:14px;color:#A1A1AA;line-height:1.6;">
        Use this code to complete your sign-in.<br>
        It expires in <strong style="color:#D4AF37;">5 minutes</strong>.
      </p>

      <!-- OTP Code -->
      <div style="display:inline-block;padding:20px 40px;background:rgba(212,175,55,0.08);border:2px solid rgba(212,175,55,0.4);border-radius:16px;letter-spacing:0.4em;font-size:40px;font-weight:700;font-family:monospace;color:#D4AF37;margin-bottom:32px;">
        ${code}
      </div>

      <p style="margin:0;font-size:13px;color:#52525B;line-height:1.6;">
        If you didn't request this, you can safely ignore this email.<br>
        Never share this code with anyone.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;color:#3F3F46;font-size:11px;">
      <p style="margin:0;">Nirvana Tech Solutions · Bhopal, India</p>
    </div>
  </div>
</body>
</html>
  `;
}

// =============================================================================
// 📤 PUBLIC HELPERS
// =============================================================================

/**
 * Send confirmation email to the client + notification to admin.
 */
export async function sendQueryEmails(data: QueryEmailData) {
  const results = {
    client: null as { id: string } | null,
    admin: null as { id: string } | null,
    errors: [] as string[],
  };

  // ---- 1. Client confirmation ----
  try {
    const { data: clientRes, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Thanks ${data.name} — we got your inquiry ✨`,
      html: clientConfirmationTemplate(data),
    });
    if (error) {
      results.errors.push(`Client email: ${error.message}`);
    } else if (clientRes) {
      results.client = { id: clientRes.id };
    }
  } catch (err) {
    results.errors.push(`Client email exception: ${String(err)}`);
  }

  // ---- 2. Admin notification ----
  try {
    const { data: adminRes, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 New inquiry from ${data.name}`,
      html: adminNotificationTemplate(data),
      replyTo: data.email,
    });
    if (error) {
      results.errors.push(`Admin email: ${error.message}`);
    } else if (adminRes) {
      results.admin = { id: adminRes.id };
    }
  } catch (err) {
    results.errors.push(`Admin email exception: ${String(err)}`);
  }

  return results;
}

/**
 * Send 6-digit OTP code for 2FA login.
 */
export async function sendOTP(to: string, code: string): Promise<void> {
  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject: `${code} is your Nirvana Tech login code`,
    html: otpTemplate(code),
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

export { resend };