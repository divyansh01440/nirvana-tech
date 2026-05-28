// =============================================================================
// 📊 NIRVANA TECH — Dashboard Charts (Client Component)
// =============================================================================
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  monthlyChart: { month: string; count: number }[];
  statusMap: Record<string, number>;
}

interface TooltipPayload {
  value?: number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0B1020] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/40 mb-1">{label}</p>
      <p className="text-nirvana-gold font-semibold">
        {payload[0].value ?? 0} queries
      </p>
    </div>
  );
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: "New", color: "#3B82F6" },
  CONTACTED: { label: "Contacted", color: "#F59E0B" },
  IN_DISCUSSION: { label: "In Discussion", color: "#8B5CF6" },
  CONVERTED: { label: "Converted", color: "#10B981" },
  ARCHIVED: { label: "Archived", color: "#ffffff20" },
};

export default function DashboardCharts({ monthlyChart, statusMap }: Props) {
  const statusEntries = Object.entries(STATUS_LABELS).map(([key, meta]) => ({
    key,
    label: meta.label,
    color: meta.color,
    count: statusMap[key] ?? 0,
  }));

  const totalStatus = statusEntries.reduce((a, b) => a + b.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* Monthly area chart */}
      <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
        <p className="text-[10px] font-semibold text-nirvana-gold tracking-widest uppercase mb-4">
          Queries this year
        </p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyChart}
              margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
            >
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#D4AF37"
                strokeWidth={2}
                fill="url(#goldGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
        <p className="text-[10px] font-semibold text-nirvana-gold tracking-widest uppercase mb-4">
          Status breakdown
        </p>

        {totalStatus === 0 ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-white/20 text-sm">No data yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {statusEntries.map((s) => {
              const pct = totalStatus > 0
                ? Math.round((s.count / totalStatus) * 100)
                : 0;
              return (
                <div key={s.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: s.color }}
                      />
                      <span className="text-xs text-white/50">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/25">{pct}%</span>
                      <span className="text-xs font-medium text-white/60 w-4 text-right">
                        {s.count}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: s.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Total */}
            <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-xs text-white/25">Total</span>
              <span className="text-sm font-semibold text-white">
                {totalStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}