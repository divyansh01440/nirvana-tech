// =============================================================================
// ⚡ NIRVANA TECH — Pusher Client (Browser only)
// =============================================================================
// Uses dynamic import to avoid Turbopack CJS/ESM resolution errors.
// Never import this file in server components or API routes.
// =============================================================================

export { CHANNELS, EVENTS } from "@/lib/pusher";

// Lazy singleton — created once on first call
let _client: import("pusher-js").default | null = null;

export async function getPusherClient(): Promise<import("pusher-js").default> {
  if (_client) return _client;

  const PusherJS = (await import("pusher-js")).default;

  _client = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
    authEndpoint: "/api/pusher/auth",
  });

  return _client;
}