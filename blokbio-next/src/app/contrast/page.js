import Header from "@/components/Header";
import Link from "next/link";
import { contrastGenes, contrastCounts } from "@/lib/mock-data";

export default function ContrastPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            <Header title="Delta (BlokBio)" />
            <div className="flex-1 px-4 md:px-12 lg:px-40 py-8 bg-white">
                <div className="max-w-[1024px] mx-auto flex flex-col gap-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-[#64748b]">
                        <Link className="hover:text-primary transition-colors" href="/">Project Alpha</Link>
                        <span className="mx-2">/</span>
                        <Link className="hover:text-primary transition-colors" href="/dgea">DGEA</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900">Contrast Analysis</span>
                    </nav>

                    {/* Title */}
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b border-gray-200">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Contrast Analysis</h1>
                            <p className="text-slate-500 mt-2">Compare differentially expressed gene sets across experimental contrasts.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/dgea" className="h-10 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to DGEA
                            </Link>
                        </div>
                    </div>

                    {/* Venn diagram card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center justify-center">
                            <h3 className="text-slate-900 font-bold text-lg mb-6">Contrast Overlap</h3>
                            <div className="relative w-72 h-52">
                                {/* SVG Venn */}
                                <svg viewBox="0 0 300 200" className="w-full h-full">
                                    <circle cx="110" cy="100" r="75" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
                                    <circle cx="190" cy="100" r="75" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
                                    <text x="75" y="95" textAnchor="middle" className="text-sm font-bold fill-blue-700">{contrastCounts.a}</text>
                                    <text x="75" y="115" textAnchor="middle" className="text-xs fill-blue-500">Contrast A</text>
                                    <text x="150" y="95" textAnchor="middle" className="text-sm font-bold fill-purple-700">{contrastCounts.overlap}</text>
                                    <text x="150" y="115" textAnchor="middle" className="text-xs fill-purple-500">Shared</text>
                                    <text x="225" y="95" textAnchor="middle" className="text-sm font-bold fill-red-700">{contrastCounts.b}</text>
                                    <text x="225" y="115" textAnchor="middle" className="text-xs fill-red-500">Contrast B</text>
                                </svg>
                            </div>
                            <div className="flex gap-4 mt-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-blue-400/50 border border-blue-400"></div>
                                    <span>Treated vs Control</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/50 border border-red-400"></div>
                                    <span>KO vs WT</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-slate-900 font-bold text-lg mb-2">Summary Statistics</h3>
                            <p className="text-slate-500 text-sm mb-6">Key differential expression metrics for the selected contrasts.</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
                                    <p className="text-2xl font-bold text-blue-700">{contrastCounts.a}</p>
                                    <p className="text-xs text-blue-600 mt-1">Unique to A</p>
                                </div>
                                <div className="p-4 rounded-lg bg-purple-50 border border-purple-100 text-center">
                                    <p className="text-2xl font-bold text-purple-700">{contrastCounts.overlap}</p>
                                    <p className="text-xs text-purple-600 mt-1">Shared Genes</p>
                                </div>
                                <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-center">
                                    <p className="text-2xl font-bold text-red-700">{contrastCounts.b}</p>
                                    <p className="text-xs text-red-600 mt-1">Unique to B</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gene Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-slate-900 font-bold text-lg">Gene Comparison Table</h3>
                            <button className="h-9 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-bold hover:bg-gray-50">
                                Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-slate-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Gene</th>
                                        <th className="px-6 py-4 font-semibold">Log2 FC</th>
                                        <th className="px-6 py-4 font-semibold">Adj. P-Value</th>
                                        <th className="px-6 py-4 font-semibold">Direction</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {contrastGenes.map((g) => (
                                        <tr key={g.gene} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900">{g.gene}</td>
                                            <td className={`px-6 py-4 font-mono ${g.log2FC > 0 ? "text-red-600" : "text-blue-600"}`}>
                                                {g.log2FC > 0 ? "+" : ""}{g.log2FC.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-slate-500">{g.adjP.toExponential(1)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold border ${g.log2FC > 0 ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                                                    {g.log2FC > 0 ? "UP" : "DOWN"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <Link href="/dgea" className="flex items-center gap-2 text-primary hover:text-teal-700 text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Back to Differential Expression
                        </Link>
                        <Link href="/pathway" className="flex items-center gap-2 text-primary hover:text-teal-700 text-sm font-medium transition-colors">
                            Pathway Analysis
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
