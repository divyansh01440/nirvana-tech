// =============================================================================
// ⚡ NIRVANA TECH — Pusher Server Helper
// =============================================================================

import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "ap2",
  useTLS: true,
});

// =============================================================================
// 📡 CHANNELS & EVENTS
// =============================================================================

export const CHANNELS = {
  ADMIN: "admin",
  CHAT: (channelId: string) => `chat-${channelId}`,
  USER: (userId: string) => `user-${userId}`,
} as const;

export const EVENTS = {
  NEW_QUERY: "new-query",
  NEW_PROJECT: "new-project",
  NEW_MESSAGE: "new-message",
  NEW_NOTIFICATION: "new-notification",
  STATUS_UPDATE: "status-update",
} as const;

// =============================================================================
// 📤 HELPERS
// =============================================================================

/**
 * Generic trigger helper — use this instead of pusherServer.trigger directly.
 */
export async function triggerEvent(
  channel: string,
  event: string,
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    await pusherServer.trigger(channel, event, data);
    return { success: true };
  } catch (err) {
    console.error(`[Pusher] Failed to trigger ${event} on ${channel}:`, err);
    return { success: false, error: String(err) };
  }
}

/**
 * Broadcast a new query notification to the admin channel.
 */
export async function broadcastNewQuery(payload: {
  id: string;
  name: string;
  email: string;
  service?: string;
  createdAt: Date;
}) {
  return triggerEvent(CHANNELS.ADMIN, EVENTS.NEW_QUERY, payload);
}

/**
 * Broadcast a new notification to a specific user channel.
 */
export async function broadcastNotification(
  userId: string,
  payload: {
    id: string;
    title: string;
    message?: string;
    link?: string;
    type: string;
    createdAt: string;
  }
) {
  return triggerEvent(CHANNELS.USER(userId), EVENTS.NEW_NOTIFICATION, payload);
}