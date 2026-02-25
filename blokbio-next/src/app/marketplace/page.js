import StaticPageLayout from "@/components/StaticPageLayout";
import Link from "next/link";

const plugins = [
    { name: "Pathway Enrichment Pro", desc: "Advanced KEGG/Reactome enrichment analysis", icon: "alt_route", category: "Analysis", installs: "2.1K" },
    { name: "Single-Cell Toolkit", desc: "scRNA-seq integration and cell-type annotation", icon: "scatter_plot", category: "Analysis", installs: "1.8K" },
    { name: "CRISPR Guide Designer", desc: "Automated sgRNA design and off-target prediction", icon: "edit_note", category: "Tools", installs: "1.5K" },
    { name: "Clinical Report Generator", desc: "FDA-compliant clinical genomics reporting", icon: "summarize", category: "Reporting", installs: "980" },
    { name: "MetaboAnalysis", desc: "Metabolomics pathway mapping and visualization", icon: "hub", category: "Analysis", installs: "870" },
    { name: "Genome Browser", desc: "Interactive genomic visualization with track support", icon: "monitoring", category: "Visualization", installs: "3.2K" },
];

export default function MarketplacePage() {
    return (
        <StaticPageLayout
            title="Plugin Marketplace"
            subtitle="Extend BlokBio with community and enterprise plugins."
            icon="storefront"
            breadcrumb={[{ label: "Marketplace" }]}
        >
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
                    <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search plugins..." type="text" />
                </div>
                <div className="flex gap-2">
                    {["All", "Analysis", "Tools", "Reporting", "Visualization"].map(cat => (
                        <button key={cat} className={`h-10 px-4 rounded-lg text-sm font-medium transition-colors ${cat === "All" ? "bg-primary text-white" : "bg-white border border-gray-200 text-slate-700 hover:bg-gray-50"}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Plugin Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plugins.map(p => (
                    <div key={p.name} className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-slate-900 font-bold group-hover:text-primary transition-colors">{p.name}</h3>
                                <span className="text-xs text-slate-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block border border-gray-200">{p.category}</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">download</span>
                                {p.installs} installs
                            </span>
                            <button className="text-primary hover:text-teal-700 text-sm font-medium flex items-center gap-1">
                                Install
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
