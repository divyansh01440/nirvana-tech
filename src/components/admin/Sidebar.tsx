"use client";

// =============================================================================
// 🗂️ NIRVANA TECH — Admin Sidebar
// =============================================================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Mail,
  FolderKanban,
  Users,
  BarChart3,
  MessageSquare,
  StickyNote,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from "lucide-react";

// =============================================================================
// 📋 TYPES
// =============================================================================
interface SidebarProps {
  userName: string;
  userRole: string;
  userImage?: string;
  queryCount?: number; // unread queries badge
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

// =============================================================================
// 📋 NAV CONFIG
// =============================================================================
const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",  href: "/nirvana-tech-admin",           icon: LayoutDashboard },
  { label: "Queries",    href: "/nirvana-tech-admin/queries",    icon: Mail            },
  { label: "Projects",   href: "/nirvana-tech-admin/projects",   icon: FolderKanban    },
  { label: "Team",       href: "/nirvana-tech-admin/team",       icon: Users           },
  { label: "Analytics",  href: "/nirvana-tech-admin/analytics",  icon: BarChart3       },
  { label: "Chat",       href: "/nirvana-tech-admin/chat",       icon: MessageSquare   },
  { label: "Notes",      href: "/nirvana-tech-admin/notes",      icon: StickyNote      },
  { label: "Settings",   href: "/nirvana-tech-admin/settings",   icon: Settings        },
];

// Role badge colors
const ROLE_COLORS: Record<string, string> = {
  ADMIN:   "bg-nirvana-gold/20 text-nirvana-gold border-nirvana-gold/30",
  MANAGER: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  TEAM:    "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CLIENT:  "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

// =============================================================================
// 🔤 INITIALS HELPER
// =============================================================================
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// =============================================================================
// 🗂️ MAIN COMPONENT
// =============================================================================
export default function Sidebar({
  userName,
  userRole,
  queryCount = 0,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

  // Inject badge into Queries nav item
  const navItems = NAV_ITEMS.map((item) =>
    item.label === "Queries" && queryCount > 0
      ? { ...item, badge: queryCount }
      : item
  );

  return (
    <>
      {/* ============== DESKTOP SIDEBAR ============== */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? "64px" : "256px" }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex fixed left-0 top-0 h-full z-40 flex-col overflow-hidden"
        style={{
          background: "rgba(5, 5, 5, 0.85)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ── TOP: Logo + Toggle ── */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/5 flex-shrink-0">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 min-w-0"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nirvana-gold to-nirvana-gold-light flex items-center justify-center flex-shrink-0">
                  <Shield size={14} className="text-nirvana-black" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-heading font-bold text-nirvana-white leading-none block">
                    NIRVANA
                  </span>
                  <span className="text-[9px] font-mono text-nirvana-gold tracking-[0.3em] leading-none block">
                    TECH
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-nirvana-gold to-nirvana-gold-light flex items-center justify-center mx-auto"
              >
                <Shield size={14} className="text-nirvana-black" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded-md flex items-center justify-center text-nirvana-gray-500 hover:text-nirvana-white hover:bg-white/5 transition-all flex-shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* ── MIDDLE: Nav Items ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* ── BOTTOM: User profile + Sign out ── */}
        <div className="border-t border-white/5 p-3 flex-shrink-0">
          {!collapsed ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {/* User info */}
              <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
                <Avatar name={userName} role={userRole} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-nirvana-white truncate leading-tight">
                    {userName}
                  </p>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border mt-0.5 inline-block ${
                      ROLE_COLORS[userRole] || ROLE_COLORS.TEAM
                    }`}
                  >
                    {userRole}
                  </span>
                </div>
              </div>

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-nirvana-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group text-xs disabled:opacity-50"
              >
                <LogOut size={14} className="flex-shrink-0" />
                <span>{signingOut ? "Signing out..." : "Sign out"}</span>
              </button>
            </motion.div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <Avatar name={userName} role={userRole} size="sm" />
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                title="Sign out"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-nirvana-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}

// =============================================================================
// 🔗 NAV LINK
// =============================================================================
interface NavLinkProps {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}

function NavLink({ item, pathname, collapsed }: NavLinkProps) {
  const Icon = item.icon;

  // Exact match for dashboard, startsWith for sub-pages
  const isActive =
    item.href === "/nirvana-tech-admin"
      ? pathname === "/nirvana-tech-admin"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl
        text-sm font-medium transition-all duration-200 group
        ${isActive
          ? "bg-nirvana-gold/10 text-nirvana-white border-l-2 border-nirvana-gold pl-[10px]"
          : "text-nirvana-gray-400 hover:text-nirvana-white hover:bg-white/5 border-l-2 border-transparent"
        }
        ${collapsed ? "justify-center px-2" : ""}
      `}
    >
      {/* Active glow dot */}
      {isActive && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-nirvana-gold" />
      )}

      {/* Icon */}
      <Icon
        size={16}
        className={`flex-shrink-0 transition-colors ${
          isActive ? "text-nirvana-gold" : "text-current"
        }`}
      />

      {/* Label */}
      {!collapsed && (
        <span className="flex-1 truncate leading-none">{item.label}</span>
      )}

      {/* Badge */}
      {!collapsed && item.badge != null && item.badge > 0 && (
        <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-nirvana-gold text-nirvana-black text-[10px] font-bold flex items-center justify-center px-1">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}

      {/* Collapsed badge dot */}
      {collapsed && item.badge != null && item.badge > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-nirvana-gold" />
      )}
    </Link>
  );
}

// =============================================================================
// 👤 AVATAR
// =============================================================================
interface AvatarProps {
  name: string;
  role: string;
  size?: "sm" | "md";
}

function Avatar({ name, role, size = "md" }: AvatarProps) {
  const initials = getInitials(name);
  const sizeClass = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  // Color based on role
  const gradients: Record<string, string> = {
    ADMIN:   "from-nirvana-gold to-nirvana-gold-light",
    MANAGER: "from-blue-500 to-blue-400",
    TEAM:    "from-purple-500 to-purple-400",
    CLIENT:  "from-gray-500 to-gray-400",
  };

  const gradient = gradients[role] || gradients.TEAM;

  return (
    <div
      className={`${sizeClass} rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
    >
      <span className="font-bold text-nirvana-black leading-none">
        {initials}
      </span>
    </div>
  );
}