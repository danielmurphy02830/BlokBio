import StaticPageLayout from "@/components/StaticPageLayout";

const workflows = [
    { name: "Standard Bulk RNA-seq Pipeline", desc: "Default pipeline: FASTQ → QC → Alignment → Counts → DGEA", icon: "account_tree", version: "v3.2", status: "Active" },
    { name: "Quick Expression Profile", desc: "Simplified pipeline for pre-aligned count matrices", icon: "speed", version: "v1.5", status: "Active" },
    { name: "Multi-contrast Analysis", desc: "Run DGEA across multiple experimental conditions simultaneously", icon: "compare", version: "v2.1", status: "Active" },
    { name: "Pathway + Gene Ontology", desc: "Post-DGEA enrichment analysis with KEGG, Reactome, and GO", icon: "alt_route", version: "v2.0", status: "Inactive" },
];

export default function WorkflowsPage() {
    return (
        <StaticPageLayout title="Installed Workflows" subtitle="Manage and configure your analysis pipelines." icon="account_tree" breadcrumb={[{ label: "Workflows" }]}>
            <div className="flex flex-col gap-4">
                {workflows.map(w => (
                    <div key={w.name} className="flex items-center gap-5 rounded-xl border border-gray-200 p-5 bg-white shadow-sm hover:border-primary/30 transition-all">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary flex-none">
                            <span className="material-symbols-outlined text-2xl">{w.icon}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-slate-900 font-bold">{w.name}</h3>
                                <span className="text-xs text-slate-400 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{w.version}</span>
                            </div>
                            <p className="text-slate-500 text-sm">{w.desc}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-none">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${w.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>{w.status}</span>
                            <button className="text-primary hover:text-teal-700 text-sm font-medium">Configure</button>
                        </div>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
