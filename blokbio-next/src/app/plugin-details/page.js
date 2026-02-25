import StaticPageLayout from "@/components/StaticPageLayout";

export default function PluginDetailsPage() {
    return (
        <StaticPageLayout title="Pathway Enrichment Pro" subtitle="Advanced KEGG/Reactome enrichment analysis plugin." icon="alt_route" breadcrumb={[{ label: "Marketplace", href: "/marketplace" }, { label: "Plugin Details" }]}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-slate-900 font-bold text-lg mb-4">Overview</h3>
                        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                            <p>Pathway Enrichment Pro extends BlokBio with comprehensive pathway analysis capabilities, supporting both KEGG and Reactome databases. Features include:</p>
                            <ul className="list-disc list-inside space-y-1 text-slate-500">
                                <li>Over-representation analysis (ORA) and gene set enrichment analysis (GSEA)</li>
                                <li>Interactive pathway visualization with gene overlays</li>
                                <li>Multi-species support with automatic ID mapping</li>
                                <li>Publication-ready figures with customizable themes</li>
                                <li>Integration with BlokBio contrast analysis for multi-comparison enrichment</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-slate-900 font-bold text-lg mb-4">Changelog</h3>
                        <div className="space-y-4">
                            {[
                                { version: "v2.3.0", date: "Feb 2026", changes: ["Added Reactome pathway support", "Improved dot plot rendering"] },
                                { version: "v2.2.1", date: "Jan 2026", changes: ["Bug fix: gene ID mapping for zebrafish", "Performance improvements for large gene sets"] },
                            ].map(v => (
                                <div key={v.version} className="pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-bold text-slate-900">{v.version}</span>
                                        <span className="text-xs text-slate-400">{v.date}</span>
                                    </div>
                                    <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                                        {v.changes.map(c => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-slate-900 font-bold mb-4">Plugin Info</h3>
                        <div className="space-y-3 text-sm">
                            {[
                                { label: "Author", value: "BlokBio Team" },
                                { label: "Version", value: "v2.3.0" },
                                { label: "Installs", value: "2,100+" },
                                { label: "License", value: "MIT" },
                                { label: "Updated", value: "Feb 25, 2026" },
                            ].map(s => (
                                <div key={s.label} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-slate-500">{s.label}</span>
                                    <span className="text-slate-900 font-medium">{s.value}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-teal-700 transition-colors">Install Plugin</button>
                    </div>
                </div>
            </div>
        </StaticPageLayout>
    );
}
