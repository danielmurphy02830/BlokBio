import StaticPageLayout from "@/components/StaticPageLayout";

export default function DevAnalyticsPage() {
    return (
        <StaticPageLayout title="API Analytics" subtitle="Monitor usage, performance, and error rates." icon="monitoring" breadcrumb={[{ label: "Dev Portal", href: "/dev-portal" }, { label: "Analytics" }]}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Requests", value: "45.2K", trend: "+12%", up: true },
                    { label: "Avg Latency", value: "142ms", trend: "-8%", up: false },
                    { label: "Error Rate", value: "0.3%", trend: "-0.1%", up: false },
                    { label: "Active Tokens", value: "3", trend: null, up: null },
                ].map(s => (
                    <div key={s.label} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <p className="text-slate-500 text-sm font-medium mb-2">{s.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                        {s.trend && (
                            <p className={`text-xs mt-1 font-medium ${s.up ? "text-emerald-600" : "text-emerald-600"}`}>
                                {s.trend} this week
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-64 flex items-center justify-center">
                <p className="text-slate-400">API usage chart would display here</p>
            </div>
        </StaticPageLayout>
    );
}
