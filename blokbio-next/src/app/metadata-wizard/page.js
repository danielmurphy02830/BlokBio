import StaticPageLayout from "@/components/StaticPageLayout";

export default function MetadataWizardPage() {
    return (
        <StaticPageLayout title="Metadata Wizard" subtitle="Generate and validate sample metadata for your experiments." icon="auto_fix_high" breadcrumb={[{ label: "Metadata Wizard" }]}>
            <div className="flex flex-col gap-6">
                {/* Steps */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    {[
                        { step: 1, label: "Experiment Info", active: true },
                        { step: 2, label: "Sample Groups", active: false },
                        { step: 3, label: "Contrasts", active: false },
                        { step: 4, label: "Review & Export", active: false },
                    ].map((s, i) => (
                        <div key={s.step} className="flex items-center gap-3">
                            <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${s.active ? "bg-primary text-white" : "bg-gray-100 text-slate-400 border border-gray-200"}`}>{s.step}</div>
                            <span className={`text-sm font-medium ${s.active ? "text-slate-900" : "text-slate-400"}`}>{s.label}</span>
                            {i < 3 && <div className="w-12 h-px bg-gray-200"></div>}
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-slate-900 font-bold text-lg mb-6">Experiment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Project Name</label>
                            <input className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g., Mouse_Liver_Study" type="text" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Organism</label>
                            <select className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary bg-white">
                                <option>Homo sapiens</option>
                                <option>Mus musculus</option>
                                <option>Rattus norvegicus</option>
                                <option>Danio rerio</option>
                                <option>Saccharomyces cerevisiae</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Library Type</label>
                            <select className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary bg-white">
                                <option>mRNA (poly-A)</option>
                                <option>Total RNA</option>
                                <option>Small RNA</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Number of Samples</label>
                            <input className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="12" type="number" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 bg-primary hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all text-sm">
                        Next: Sample Groups
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </StaticPageLayout>
    );
}
