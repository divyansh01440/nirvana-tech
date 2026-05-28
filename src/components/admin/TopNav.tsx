// =============================================================================
// 🔝 NIRVANA TECH — Admin Top Navigation
// =============================================================================
"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bell,
  ChevronRight,
  Moon,
  User,
  Settings,
  LogOut,
  FolderKanban,
  Users,
  Mail,
  BarChart3,
  Hash,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ── No top-level pusher import — loaded dynamically inside useEffect ──
import { CHANNELS, EVENTS } from "@/lib/pusher";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Notification {
  id: string;
  title: string;
  message?: string;
  link?: string;
  read: boolean;
  createdAt: string;
  type: string;
}

interface TopNavProps {
  userName: string;
  userEmail: string;
  userImage?: string;
  userRole: string;
  collapsed?: boolean;
  onMobileMenuToggle?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildBreadcrumb(pathname: string) {
  const parts = pathname
    .replace("/nirvana-tech-admin", "")
    .split("/")
    .filter(Boolean);
  return [
    "Dashboard",
    ...parts.map(
      (p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ")
    ),
  ];
}

// ── Sample notifications shown before API loads ──
const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "sample-1",
    title: "New inquiry received",
    message: "Rahul Sharma — Website Development",
    link: "/nirvana-tech-admin/queries",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: "QUERY",
  },
  {
    id: "sample-2",
    title: "Project status updated",
    message: "E-Commerce Platform moved to Review",
    link: "/nirvana-tech-admin/projects",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "PROJECT",
  },
  {
    id: "sample-3",
    title: "New team message",
    message: "Priya posted in #design",
    link: "/nirvana-tech-admin/chat",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: "MESSAGE",
  },
];

const COMMAND_ITEMS = [
  {
    group: "Navigate",
    items: [
      { label: "Dashboard", href: "/nirvana-tech-admin", icon: Hash },
      { label: "Projects", href: "/nirvana-tech-admin/projects", icon: FolderKanban },
      { label: "Team", href: "/nirvana-tech-admin/team", icon: Users },
      { label: "Queries", href: "/nirvana-tech-admin/queries", icon: Mail },
      { label: "Analytics", href: "/nirvana-tech-admin/analytics", icon: BarChart3 },
      { label: "Settings", href: "/nirvana-tech-admin/settings", icon: Settings },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function TopNav({
  userName,
  userEmail,
  userImage,
  userRole,
  collapsed = false,
  onMobileMenuToggle,
}: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumb = buildBreadcrumb(pathname);

  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ── Fetch real notifications ──
  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) setNotifications(d.data);
      })
      .catch(() => {
        // API not ready yet — keep sample notifications
      });
  }, []);

  // ── Pusher — dynamic import to fix Turbopack CJS/ESM error ──
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    import("pusher-js").then((mod) => {
      const PusherJS = mod.default;
      const client = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
      });

      const channel = client.subscribe(CHANNELS.ADMIN);

      channel.bind(EVENTS.NEW_NOTIFICATION, (data: Notification) => {
        setNotifications((prev) => [data, ...prev].slice(0, 30));
      });

      channel.bind(
        EVENTS.NEW_QUERY,
        (data: { id: string; name: string; service?: string }) => {
          setNotifications((prev) =>
            [
              {
                id: `query-${data.id}`,
                title: "New inquiry received",
                message: `${data.name}${data.service ? ` — ${data.service}` : ""}`,
                link: "/nirvana-tech-admin/queries",
                read: false,
                createdAt: new Date().toISOString(),
                type: "QUERY",
              },
              ...prev,
            ].slice(0, 30)
          );
        }
      );

      cleanup = () => {
        channel.unbind_all();
        client.unsubscribe(CHANNELS.ADMIN);
        client.disconnect();
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // ── ⌘K keyboard shortcut ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    fetch("/api/notifications/mark-read", { method: "POST" }).catch(() => {});
  }, []);

  const markOneRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={cn(
          "fixed top-0 right-0 h-16 z-40 flex items-center px-4 sm:px-5 gap-3",
          "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]",
          "transition-all duration-300",
          "left-0",
          collapsed ? "lg:left-[70px]" : "lg:left-64"
        )}
      >
        {/* ── LEFT: hamburger (mobile) + breadcrumb (desktop) ── */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={onMobileMenuToggle}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
          >
            <Menu size={18} />
          </button>

          {/* Desktop breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1 min-w-0 overflow-hidden">
            {breadcrumb.map((crumb, i) => (
              <span
                key={i}
                className="flex items-center gap-1 min-w-0 shrink-0"
              >
                {i > 0 && (
                  <ChevronRight size={12} className="text-white/15 shrink-0" />
                )}
                <span
                  className={cn(
                    "text-sm truncate",
                    i === breadcrumb.length - 1
                      ? "text-white/80 font-medium"
                      : "text-white/25"
                  )}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </nav>

          {/* Mobile: current page name only */}
          <span className="sm:hidden text-sm font-medium text-white/80 truncate">
            {breadcrumb[breadcrumb.length - 1]}
          </span>
        </div>

        {/* ── CENTER: Search bar (visual, opens ⌘K) ── */}
        <button
          onClick={() => setCmdOpen(true)}
          className={cn(
            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg",
            "bg-white/[0.04] border border-white/[0.06]",
            "text-white/25 hover:text-white/50 hover:bg-white/[0.07]",
            "transition-all duration-150 text-xs min-w-[200px]"
          )}
        >
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/10 font-mono text-white/20">
            ⌘K
          </kbd>
        </button>

        {/* ── RIGHT: Actions ── */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Mobile search button */}
          <button
            onClick={() => setCmdOpen(true)}
            aria-label="Search"
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
          >
            <Hash size={16} />
          </button>

          {/* Notification bell */}
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <button
                aria-label="Notifications"
                className={cn(
                  "relative w-9 h-9 rounded-xl flex items-center justify-center",
                  "border transition-colors duration-150",
                  notifOpen
                    ? "bg-nirvana-gold/10 text-nirvana-gold border-nirvana-gold/20"
                    : "text-white/35 border-transparent hover:text-white/70 hover:bg-white/[0.05]"
                )}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-nirvana-gold border-2 border-black" />
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-80 p-0 bg-[#0B1020] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-nirvana-gold text-black text-[10px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-nirvana-gold hover:underline underline-offset-2"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification list */}
              <div className="max-h-[340px] overflow-y-auto divide-y divide-white/[0.04]">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-white/20 text-sm">All caught up ✓</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className={cn(
                        "w-full text-left px-4 py-3 transition-colors",
                        "hover:bg-white/[0.03]",
                        !notif.read && "bg-nirvana-gold/[0.03]"
                      )}
                      onClick={() => {
                        markOneRead(notif.id);
                        if (notif.link) {
                          router.push(notif.link);
                          setNotifOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        {!notif.read && (
                          <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-nirvana-gold shrink-0" />
                        )}
                        <div
                          className={cn(
                            "flex-1 min-w-0",
                            notif.read && "pl-4"
                          )}
                        >
                          <p className="text-xs font-medium text-white truncate">
                            {notif.title}
                          </p>
                          {notif.message && (
                            <p className="text-[11px] text-white/40 truncate mt-0.5">
                              {notif.message}
                            </p>
                          )}
                          <p className="text-[10px] text-white/20 mt-1">
                            {formatDate(new Date(notif.createdAt))}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    router.push("/nirvana-tech-admin/notifications");
                    setNotifOpen(false);
                  }}
                  className="text-[11px] text-nirvana-gold hover:underline underline-offset-2"
                >
                  See all notifications →
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme toggle — locked dark */}
          <button
            disabled
            aria-label="Theme locked to dark"
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-transparent text-white/20 cursor-not-allowed"
          >
            <Moon size={15} />
          </button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="User menu"
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.04] transition-all duration-150"
              >
                <Avatar size="sm">
                  <AvatarImage src={userImage} alt={userName} />
                  <AvatarFallback className="bg-nirvana-gold/10 text-nirvana-gold text-[10px] font-bold">
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-xs font-medium text-white/60 max-w-[80px] truncate">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-52 bg-[#0B1020] border border-white/[0.08] rounded-xl p-1.5"
            >
              <DropdownMenuLabel className="px-2 py-2">
                <p className="text-xs font-semibold text-white truncate">
                  {userName}
                </p>
                <p className="text-[10px] text-white/30 truncate mt-0.5">
                  {userEmail}
                </p>
                <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded-md bg-nirvana-gold/10 border border-nirvana-gold/20 text-nirvana-gold text-[9px] font-semibold tracking-wider">
                  {userRole}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/[0.06] my-1" />

              <DropdownMenuItem
                onClick={() => router.push("/nirvana-tech-admin/profile")}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-white/60 hover:text-white"
              >
                <User size={14} className="shrink-0" />
                <span className="text-xs">Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/nirvana-tech-admin/settings")}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-white/60 hover:text-white"
              >
                <Settings size={14} className="shrink-0" />
                <span className="text-xs">Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/[0.06] my-1" />

              <DropdownMenuItem
                onClick={() =>
                  signOut({ callbackUrl: "/nirvana-tech-admin/login" })
                }
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06]"
              >
                <LogOut size={14} className="shrink-0" />
                <span className="text-xs">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ── Command Palette ── */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search pages, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {COMMAND_ITEMS.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={item.label}
                    onSelect={() => {
                      router.push(item.href);
                      setCmdOpen(false);
                    }}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <Icon size={14} className="text-white/40 shrink-0" />
                    <span>{item.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              value="sign out logout"
              onSelect={() => {
                setCmdOpen(false);
                signOut({ callbackUrl: "/nirvana-tech-admin/login" });
              }}
              className="flex items-center gap-2.5 cursor-pointer text-red-400"
            >
              <LogOut size={14} className="shrink-0" />
              <span>Sign out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}