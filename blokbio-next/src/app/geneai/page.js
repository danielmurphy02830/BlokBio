import StaticPageLayout from "@/components/StaticPageLayout";

export default function GeneAIPage() {
    return (
        <StaticPageLayout
            title="GeneAI Assistant"
            subtitle="AI-powered genomic analysis assistant. Ask questions about your data in natural language."
            icon="auto_awesome"
            breadcrumb={[{ label: "GeneAI" }]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Chat Area */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[600px]">
                        <div className="p-5 border-b border-gray-200 flex items-center gap-3 bg-gray-50 rounded-t-xl">
                            <div className="size-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="text-slate-900 font-bold">GeneAI v2.4</h3>
                                <p className="text-xs text-slate-500">Powered by Delta Language Model</p>
                            </div>
                            <span className="ml-auto px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">Online</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="flex gap-3">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                                    <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-200 max-w-lg">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        Welcome to GeneAI! I can help you interpret your genomic data, analyze differential expression results, and provide insights into pathway enrichment. How can I assist you today?
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-primary/10 p-4 rounded-xl rounded-tr-none border border-primary/20 max-w-lg">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        What are the top enriched pathways in my latest DGEA results?
                                    </p>
                                </div>
                                <div className="size-8 rounded-full bg-gradient-to-br from-primary to-teal-800 flex items-center justify-center flex-none text-white text-xs font-bold">DA</div>
                            </div>
                            <div className="flex gap-3">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                                    <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-200 max-w-lg">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        Based on your latest analysis of <strong>Project Alpha</strong>, the top 3 enriched KEGG pathways are:
                                    </p>
                                    <ol className="mt-3 text-sm text-slate-700 space-y-2">
                                        <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span> Cytokine-cytokine receptor interaction (p &lt; 0.001)</li>
                                        <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span> TNF signaling pathway (p = 0.005)</li>
                                        <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span> NF-kappa B signaling (p = 0.008)</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <div className="flex items-center gap-3">
                                <input className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ask GeneAI about your data..." type="text" />
                                <button className="p-2.5 bg-primary rounded-lg text-white hover:bg-teal-700 transition-colors">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-slate-900 font-bold mb-3">Suggested Prompts</h3>
                        <div className="flex flex-col gap-2">
                            {["Summarize my QC results", "Compare control vs treated samples", "Explain the volcano plot", "List known drug targets in DEGs"].map((p) => (
                                <button key={p} className="text-left px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-600 text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-slate-900 font-bold mb-3">Data Context</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-500">Active Project</span>
                                <span className="text-slate-900 font-medium">Project Alpha</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-500">Samples</span>
                                <span className="text-slate-900 font-medium">12</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-slate-500">DEGs Found</span>
                                <span className="text-slate-900 font-medium">1,204</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StaticPageLayout>
    );
}
