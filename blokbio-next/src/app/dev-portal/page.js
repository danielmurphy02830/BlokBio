import StaticPageLayout from "@/components/StaticPageLayout";
import Link from "next/link";

const sections = [
    { title: "API Reference", desc: "Complete REST API documentation with interactive examples", icon: "api", href: "/dev-portal/api" },
    { title: "Webhooks", desc: "Configure event-driven notifications for pipeline actions", icon: "webhook", href: "/dev-portal/webhooks" },
    { title: "Sandbox", desc: "Test API calls with sample data before going to production", icon: "science", href: "/dev-portal/sandbox" },
    { title: "Analytics", desc: "Monitor API usage, latency, and error rates", icon: "monitoring", href: "/dev-portal/analytics" },
    { title: "Support", desc: "Get help from the BlokBio developer community", icon: "support_agent", href: "/dev-portal/support" },
];

export default function DevPortalPage() {
    return (
        <StaticPageLayout
            title="Developer Portal"
            subtitle="Build integrations, extend workflows, and access the BlokBio API."
            icon="code"
            breadcrumb={[{ label: "Developer Portal" }]}
        >
            {/* Quick Start */}
            <div className="bg-slate-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">terminal</span>
                    <h3 className="font-bold text-lg">Quick Start</h3>
                </div>
                <pre className="bg-black/30 rounded-lg p-4 text-sm font-mono text-green-400 overflow-x-auto">
                    {`curl -X GET https://api.blokbio.com/v2/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
            </div>

            {/* Developer Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map(s => (
                    <Link key={s.title} href={s.href} className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mb-4">
                            <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                        </div>
                        <h3 className="text-slate-900 font-bold group-hover:text-primary transition-colors mb-1">{s.title}</h3>
                        <p className="text-slate-500 text-sm">{s.desc}</p>
                    </Link>
                ))}
            </div>

            {/* API Key */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-slate-900 font-bold text-lg mb-4">Your API Keys</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                        <p className="text-sm text-slate-500 mb-1">Production Key</p>
                        <p className="font-mono text-sm text-slate-900">bk_live_••••••••••••••••</p>
                    </div>
                    <button className="h-9 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-medium hover:bg-gray-50">Copy</button>
                    <button className="h-9 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-medium hover:bg-gray-50">Regenerate</button>
                </div>
            </div>
        </StaticPageLayout>
    );
}
