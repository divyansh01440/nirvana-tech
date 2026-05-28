import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

export default async function AdminDashboard() {
  const session = await auth();

  // Double-check auth (middleware handles most cases, this is a fallback)
  if (!session?.user) {
    redirect("/nirvana-tech-admin/login");
  }

  const allowed = ["ADMIN", "MANAGER", "TEAM"];
  if (!allowed.includes(session.user.role)) {
    redirect("/");
  }

  return (
    <>
      <Sidebar
        userName={session.user.name ?? "Admin"}
        userRole={session.user.role}
        userImage={session.user.image ?? undefined}
      />

      <TopNav
        userName={session.user.name ?? "Admin"}
        userEmail={session.user.email ?? ""}
        userRole={session.user.role}
      />

      {/* Main content */}
      <main className="relative z-10 lg:ml-64 mt-16 min-h-[calc(100vh-64px)] p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold gradient-text mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-nirvana-gray-400">
              Welcome back, {session.user.name ?? session.user.email} 👋
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Queries",   value: "—", icon: "📨", color: "from-nirvana-gold/20 to-nirvana-gold/5"  },
              { label: "New Inquiries",   value: "—", icon: "⚡", color: "from-blue-500/20 to-blue-500/5"          },
              { label: "Active Projects", value: "—", icon: "🚀", color: "from-purple-500/20 to-purple-500/5"      },
              { label: "This Month",      value: "—", icon: "📊", color: "from-emerald-500/20 to-emerald-500/5"    },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className={`glass border border-white/10 rounded-2xl p-5 bg-gradient-to-br ${kpi.color}`}
              >
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <div className="text-2xl font-heading font-bold text-nirvana-white mb-1">
                  {kpi.value}
                </div>
                <div className="text-xs text-nirvana-gray-400">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Info card */}
          <div className="glass border border-nirvana-gold/20 rounded-2xl p-6">
            <h2 className="text-lg font-heading font-semibold text-nirvana-white mb-2">
              ✅ Auth is working!
            </h2>
            <div className="space-y-1 text-sm text-nirvana-gray-400">
              <p>
                <span className="text-nirvana-gray-500">Name: </span>
                <span className="text-nirvana-white">
                  {session.user.name}
                </span>
              </p>
              <p>
                <span className="text-nirvana-gray-500">Email: </span>
                <span className="text-nirvana-white">
                  {session.user.email}
                </span>
              </p>
              <p>
                <span className="text-nirvana-gray-500">Role: </span>
                <span className="text-nirvana-gold font-bold">
                  {session.user.role}
                </span>
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}