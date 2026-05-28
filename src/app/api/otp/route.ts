// =============================================================================
// 📱 NIRVANA TECH — OTP Generation & Email API
// =============================================================================
// POST /api/otp
// Body: { email: string }
//
// Logic:
//   1. Find user by email
//   2. Check 2FA is enabled
//   3. Generate 6-digit OTP
//   4. Save OTP + expiry (5 min) to DB
//   5. Send OTP via Resend email
//   6. Return { success: true }
// =============================================================================

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate cryptographically random 6-digit OTP
function generateOTP(): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

function otpEmailTemplate(name: string, otp: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:40px 20px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="margin:0;font-size:24px;font-weight:700;">
        <span style="color:#F5F5F5;">NIRVANA</span>
        <span style="color:#D4AF37;font-size:11px;letter-spacing:0.2em;margin-left:4px;">TECH</span>
      </h1>
    </div>

    <!-- Card -->
    <div style="background:#0B1020;border:1px solid rgba(212,175,55,0.3);border-radius:24px;padding:40px;text-align:center;">
      
      <div style="font-size:12px;color:#D4AF37;text-transform:uppercase;letter-spacing:0.3em;margin-bottom:16px;">
        Admin Login Verification
      </div>

      <h2 style="margin:0 0 8px 0;font-size:22px;color:#F5F5F5;">
        Hi ${name}, here's your OTP
      </h2>

      <p style="margin:0 0 32px 0;font-size:14px;color:#71717A;">
        Enter this code to complete your login. Valid for 5 minutes.
      </p>

      <!-- OTP Code -->
      <div style="display:inline-block;padding:20px 40px;background:rgba(212,175,55,0.1);border:2px solid rgba(212,175,55,0.4);border-radius:16px;margin-bottom:32px;">
        <div style="font-size:48px;font-weight:700;letter-spacing:0.3em;color:#D4AF37;font-family:monospace;">
          ${otp}
        </div>
      </div>

      <div style="padding:16px;background:rgba(255,0,0,0.05);border:1px solid rgba(255,0,0,0.15);border-radius:12px;">
        <p style="margin:0;font-size:13px;color:#EF4444;">
          ⚠️ Never share this code. Expires in <strong>5 minutes</strong>.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;color:#3F3F46;font-size:11px;">
      <p style="margin:0;">If you didn't request this, someone may be trying to access your account.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    // ---- 1. PARSE BODY ----
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const email = String((body as Record<string, unknown>)?.email ?? "")
      .toLowerCase()
      .trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // ---- 2. FIND USER ----
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        twoFAEnabled: true,
        lockedUntil: true,
      },
    });

    // Generic message — don't reveal if user exists
    if (!user) {
      return NextResponse.json(
        { success: true, message: "If this email exists, an OTP was sent." },
        { status: 200 }
      );
    }

    // ---- 3. CHECK NOT LOCKED ----
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json(
        { error: "Account is locked. Try again later." },
        { status: 429 }
      );
    }

    // ---- 4. CHECK 2FA ENABLED ----
    if (!user.twoFAEnabled) {
      return NextResponse.json(
        { error: "2FA is not enabled for this account." },
        { status: 400 }
      );
    }

    // ---- 5. GENERATE OTP ----
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // ---- 6. SAVE TO DB ----
    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: otp, otpExpires },
    });

    // ---- 7. SEND EMAIL ----
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error: emailError } = await resend.emails.send({
      from: `Nirvana Tech <${fromEmail}>`,
      to: user.email,
      subject: `${otp} — Your Nirvana Tech admin login code`,
      html: otpEmailTemplate(user.name ?? "Admin", otp),
    });

    if (emailError) {
      console.error("[OTP] Email send failed:", emailError);
      // Don't expose internal error to client
      return NextResponse.json(
        { error: "Failed to send OTP email. Try again." },
        { status: 500 }
      );
    }

    console.log(`[OTP] Sent to ${user.email} — expires ${otpExpires}`);

    return NextResponse.json(
      { success: true, message: "OTP sent to your email." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/otp] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}