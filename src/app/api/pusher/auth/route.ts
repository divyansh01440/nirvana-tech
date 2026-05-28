// =============================================================================
// 🔐 NIRVANA TECH — Pusher Channel Auth Endpoint
// POST /api/pusher/auth
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse body — Pusher sends form-encoded data
    const body = await req.text();
    const params = new URLSearchParams(body);
    const socket_id = params.get("socket_id");
    const channel_name = params.get("channel_name");

    if (!socket_id || !channel_name) {
      return NextResponse.json(
        { error: "Missing socket_id or channel_name" },
        { status: 400 }
      );
    }

    // 3. Only allow admin/team roles to access private/presence channels
    const allowedRoles = ["ADMIN", "MANAGER", "TEAM"];
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // 4. Authorize the channel
    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      {
        user_id: session.user.id,
        user_info: {
          name: session.user.name ?? "Admin",
          email: session.user.email ?? "",
          role: session.user.role,
          image: session.user.image ?? null,
        },
      }
    );

    return NextResponse.json(authResponse);
  } catch (err) {
    console.error("[Pusher Auth]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}