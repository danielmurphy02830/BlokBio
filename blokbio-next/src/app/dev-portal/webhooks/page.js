import StaticPageLayout from "@/components/StaticPageLayout";

export default function DevWebhooksPage() {
    return (
        <StaticPageLayout title="Webhooks" subtitle="Configure event-driven notifications for your pipeline." icon="webhook" breadcrumb={[{ label: "Dev Portal", href: "/dev-portal" }, { label: "Webhooks" }]}>
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-slate-900 font-bold mb-4">Active Webhooks</h3>
                    <div className="space-y-3">
                        {[
                            { event: "project.created", url: "https://hooks.your-org.com/blokbio/new", status: "Active" },
                            { event: "analysis.completed", url: "https://hooks.your-org.com/blokbio/done", status: "Active" },
                            { event: "qc.failed", url: "https://hooks.your-org.com/blokbio/alert", status: "Paused" },
                        ].map(w => (
                            <div key={w.event} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex-1">
                                    <code className="text-sm font-mono text-primary">{w.event}</code>
                                    <p className="text-xs text-slate-500 mt-1 font-mono">{w.url}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${w.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>{w.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-fit flex items-center gap-2 bg-primary hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all text-sm">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Webhook
                </button>
            </div>
        </StaticPageLayout>
    );
}
