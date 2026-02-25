import StaticPageLayout from "@/components/StaticPageLayout";

export default function ReportPage() {
    return (
        <StaticPageLayout title="Analysis Report" subtitle="Auto-generated summary report for your latest RNA-seq analysis." icon="summarize" breadcrumb={[{ label: "Report" }]}>
            <div className="flex flex-col gap-6">
                {/* Report Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-slate-900 font-bold text-lg">Mouse_Liver_Study_001</h3>
                            <p className="text-slate-500 text-sm mt-1">Generated: Feb 25, 2026 • Project ID: DLT-8921</p>
                        </div>
                        <button className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-teal-700 transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            Download PDF
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        {[
                            { label: "Organism", value: "Mus musculus" },
                            { label: "Samples", value: "12" },
                            { label: "DEGs", value: "1,204" },
                            { label: "BlokScore™", value: "94/100" },
                        ].map(s => (
                            <div key={s.label}>
                                <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
                                <p className="text-slate-900 font-bold">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Report Sections */}
                {[
                    { title: "1. Quality Control Summary", content: "All 12 samples passed automated QC checks. Mean mapping rate: 98.2%. One sample (Control_03) flagged for elevated duplication rate (28%) but remained within 2σ bounds. Recommendation: proceed with analysis." },
                    { title: "2. Differential Expression Summary", content: "A total of 1,204 genes were identified as differentially expressed (|log2FC| > 1, adj. p < 0.05). Of these, 645 were upregulated and 559 were downregulated. The most significant gene was IL6 (log2FC = 4.23, adj. p = 4.5e-10)." },
                    { title: "3. Pathway Enrichment", content: "48 KEGG pathways were significantly enriched (FDR < 0.05). The top pathway was Cytokine-cytokine receptor interaction (p < 0.001, 42 genes). Inflammatory signaling pathways dominated the enrichment results." },
                    { title: "4. Recommendations", content: "The strong inflammatory signature suggests activation of innate immune response pathways. Consider follow-up validation of IL6, TNF, and CXCL8 via qPCR. The TNF signaling pathway may be a candidate for therapeutic intervention." },
                ].map(section => (
                    <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-slate-900 font-bold text-lg mb-3">{section.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
