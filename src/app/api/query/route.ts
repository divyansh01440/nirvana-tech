// =============================================================================
// 📨 NIRVANA TECH — Query Submission API
// =============================================================================
// POST /api/query
// =============================================================================

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { queryFormSchema } from "@/lib/validations/query";
import { sendQueryEmails } from "@/lib/resend";
import { broadcastNewQuery } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    // ---- 1. PARSE BODY ----
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // ---- 2. VALIDATE WITH ZOD ----
    const parsed = queryFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstError?.message || "Validation failed",
          field: firstError?.path.join("."),
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const fullPhone = `${data.phoneCode} ${data.phone}`.trim();

    // ---- 3. SAVE TO DATABASE ----
    const query = await prisma.query.create({
      data: {
        name: data.name,
        email: data.email,
        phone: fullPhone,
        company: data.company || null,
        website: data.website || null,
        service: data.service || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message,
        status: "NEW",
      },
    });

    console.log("✅ Query saved to DB:", query.id);

    // ---- 4. SEND EMAILS (with logging) ----
    const emailResult = await sendQueryEmails({
      name: data.name,
      email: data.email,
      phone: fullPhone,
      company: data.company,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
      queryId: query.id,
    });

    console.log("📧 Email send result:", JSON.stringify(emailResult, null, 2));

    // ---- 5. CREATE ADMIN NOTIFICATION ----
    try {
      const admin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        select: { id: true },
      });

      if (admin) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            type: "QUERY",
            title: `New inquiry from ${data.name}`,
            message: data.service
              ? `Interested in ${data.service}`
              : "Wants to discuss a project",
            link: `/nirvana-tech-admin/queries/${query.id}`,
            read: false,
          },
        });
        console.log("🔔 Admin notification created");
      } else {
        console.warn("⚠️ No admin user found to notify");
      }
    } catch (err) {
      console.error("❌ Notification creation failed:", err);
    }

    // ---- 6. BROADCAST PUSHER EVENT ----
    try {
      const pusherResult = await broadcastNewQuery({
        id: query.id,
        name: query.name,
        email: query.email,
        service: query.service || undefined,
        createdAt: query.createdAt,
      });
      console.log("⚡ Pusher broadcast:", pusherResult);
    } catch (err) {
      console.error("❌ Pusher broadcast failed:", err);
    }

    // ---- 7. RETURN SUCCESS ----
    return NextResponse.json(
      {
        success: true,
        id: query.id,
        message: "Your inquiry was received. We'll be in touch within 24 hours.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ [POST /api/query] Unhandled error:", err);

    return NextResponse.json(
      {
        error: "Something went wrong on our end. Please try again or email us directly.",
        details: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}