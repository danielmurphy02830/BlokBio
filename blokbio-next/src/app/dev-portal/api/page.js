import StaticPageLayout from "@/components/StaticPageLayout";

export default function DevAPIPage() {
    return (
        <StaticPageLayout title="API Reference" subtitle="REST API endpoints for programmatic access to BlokBio." icon="api" breadcrumb={[{ label: "Dev Portal", href: "/dev-portal" }, { label: "API Reference" }]}>
            <div className="flex flex-col gap-6">
                {[
                    { method: "GET", path: "/v2/projects", desc: "List all projects in your workspace", color: "bg-green-100 text-green-800" },
                    { method: "POST", path: "/v2/projects", desc: "Create a new analysis project", color: "bg-blue-100 text-blue-800" },
                    { method: "GET", path: "/v2/projects/:id/samples", desc: "List samples for a project", color: "bg-green-100 text-green-800" },
                    { method: "POST", path: "/v2/projects/:id/upload", desc: "Upload genomic data files", color: "bg-blue-100 text-blue-800" },
                    { method: "POST", path: "/v2/projects/:id/run-dgea", desc: "Trigger differential expression analysis", color: "bg-blue-100 text-blue-800" },
                    { method: "GET", path: "/v2/projects/:id/results", desc: "Retrieve analysis results", color: "bg-green-100 text-green-800" },
                    { method: "DELETE", path: "/v2/projects/:id", desc: "Delete a project and all associated data", color: "bg-red-100 text-red-800" },
                ].map(ep => (
                    <div key={ep.path + ep.method} className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${ep.color}`}>{ep.method}</span>
                            <code className="text-sm font-mono text-slate-900">{ep.path}</code>
                        </div>
                        <p className="text-slate-500 text-sm">{ep.desc}</p>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
