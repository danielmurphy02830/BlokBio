"use client";
import Link from "next/link";
import { dgeGenes } from "@/lib/mock-data";
import dynamic from "next/dynamic";

const VolcanoPlot = dynamic(() => import("@/components/charts/VolcanoPlot"), { ssr: false });

export default function DGEAPage() {
    return (
        <div className="bg-[#f9fafb] text-slate-900 overflow-hidden flex flex-col h-screen" style={{ fontFamily: "var(--font-display)" }}>
            <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-6 py-3 shadow-sm z-30">
                <div className="flex items-center gap-4 text-slate-900">
                    <Link href="/" className="size-8 flex items-center justify-center rounded bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">biotech</span>
                    </Link>
                    <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Delta Analysis</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <div className="hidden md:flex items-center gap-6">
                        <Link className="text-slate-600 text-sm font-medium hover:text-primary transition-colors" href="/workspaces">Projects</Link>
                        <Link className="text-slate-600 text-sm font-medium hover:text-primary transition-colors" href="#">Settings</Link>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col min-w-0 bg-[#f9fafb] overflow-y-auto">
                    <div className="flex-none px-6 pt-5 pb-2">
                        {/* Breadcrumb */}
                        <div className="flex flex-wrap gap-2 mb-4 items-center">
                            <span className="material-symbols-outlined text-slate-400 text-lg">folder</span>
                            <Link className="text-slate-500 text-sm font-medium hover:text-primary" href="/">Project Alpha</Link>
                            <span className="text-slate-400 text-sm font-medium">/</span>
                            <span className="text-primary text-sm font-medium">Analysis Results</span>
                        </div>

                        {/* Title + Actions */}
                        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-gray-200 pb-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-[-0.033em]">Differential Expression</h1>
                                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold border border-green-200">COMPLETED</span>
                                </div>
                                <p className="text-slate-500 text-base">Comparison: Treated (n=3) vs. Control (n=3) @ 24h</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-gray-300 bg-white text-slate-700 text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">tune</span>
                                    <span>Parameters</span>
                                </button>
                                <Link href="/contrast" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white border border-gray-300 text-slate-700 text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">donut_large</span>
                                    <span>Contrast Analysis</span>
                                </Link>
                                <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    <span>Export Report</span>
                                </button>
                                <Link href="/pathway" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-teal-700 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">alt_route</span>
                                    <span>Pathway Analysis</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 flex flex-col gap-6">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: "Total Genes", value: "15,432", icon: "genetics", color: "text-slate-500" },
                                { label: "Significant DEGs", value: "1,204", icon: "functions", color: "text-primary" },
                                { label: "Upregulated", value: "645", icon: "trending_up", color: "text-red-500" },
                                { label: "Downregulated", value: "559", icon: "trending_down", color: "text-blue-500" },
                            ].map((card) => (
                                <div key={card.label} className="flex flex-col gap-2 rounded-lg p-5 border border-gray-200 bg-white shadow-sm">
                                    <div className={`flex items-center gap-2 ${card.color}`}>
                                        <span className="material-symbols-outlined text-lg">{card.icon}</span>
                                        <p className="text-sm font-medium">{card.label}</p>
                                    </div>
                                    <p className="text-slate-900 text-2xl font-bold">{card.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Volcano + Heatmap */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
                            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-slate-900 text-lg font-bold">Volcano Plot</h3>
                                        <p className="text-slate-500 text-sm">Log2FC vs -Log10 P-value</p>
                                    </div>
                                </div>
                                <div className="relative flex-1 w-full h-full min-h-[300px]">
                                    <VolcanoPlot />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-slate-900 text-lg font-bold">Expression Heatmap</h3>
                                        <p className="text-slate-500 text-sm">Top 50 DEGs (Z-Score)</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex-1 grid grid-cols-6 gap-[1px] bg-gray-100 rounded overflow-hidden border border-gray-100">
                                        <div className="col-span-1 bg-white"></div>
                                        {["S1", "S2", "S3", "C1", "C2"].map(l => (
                                            <div key={l} className="bg-white text-slate-500 text-xs text-center py-1 font-bold">{l}</div>
                                        ))}
                                        {[
                                            { gene: "IL6", colors: ["bg-red-500", "bg-red-600", "bg-red-400", "bg-blue-500", "bg-blue-600"] },
                                            { gene: "TNF", colors: ["bg-red-400", "bg-red-500", "bg-red-500", "bg-blue-400", "bg-blue-500"] },
                                            { gene: "CXCL8", colors: ["bg-red-600", "bg-red-500", "bg-red-600", "bg-blue-600", "bg-blue-700"] },
                                            { gene: "TP53", colors: ["bg-blue-500", "bg-blue-400", "bg-blue-500", "bg-red-500", "bg-red-400"] },
                                            { gene: "EGFR", colors: ["bg-blue-600", "bg-blue-700", "bg-blue-600", "bg-red-400", "bg-red-500"] },
                                            { gene: "VEGFA", colors: ["bg-red-300", "bg-red-400", "bg-red-300", "bg-blue-300", "bg-blue-400"] },
                                        ].map(row => (
                                            <>
                                                <div key={row.gene} className="bg-white text-slate-700 text-xs py-1 px-2 font-mono truncate font-semibold">{row.gene}</div>
                                                {row.colors.map((c, i) => <div key={`${row.gene}-${i}`} className={`${c} h-6`}></div>)}
                                            </>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <span className="text-[10px] text-slate-400">-2.0</span>
                                        <div className="w-24 h-2 rounded-full bg-gradient-to-r from-blue-600 via-white to-red-600 ring-1 ring-inset ring-black/10"></div>
                                        <span className="text-[10px] text-slate-400">+2.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gene Table */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-slate-900 text-lg font-bold">Differentially Expressed Genes</h3>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-2 text-slate-400 text-lg">search</span>
                                        <input className="bg-white border border-gray-300 text-slate-900 text-sm rounded-lg pl-10 pr-4 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 shadow-sm" placeholder="Search genes..." type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-gray-50 text-slate-700 uppercase text-xs tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Gene Symbol</th>
                                            <th className="px-6 py-4 font-semibold">Gene ID</th>
                                            <th className="px-6 py-4 font-semibold">Log2 FC</th>
                                            <th className="px-6 py-4 font-semibold">P-Value</th>
                                            <th className="px-6 py-4 font-semibold">Adj. P-Value</th>
                                            <th className="px-6 py-4 font-semibold">Regulation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dgeGenes.map((g) => (
                                            <tr key={g.symbol} className="hover:bg-slate-50 transition-colors border-b border-gray-100">
                                                <td className="px-6 py-4 font-bold text-slate-900">{g.symbol}</td>
                                                <td className="px-6 py-4 font-mono text-slate-500">{g.id}</td>
                                                <td className={`px-6 py-4 font-medium ${g.reg === "UP" ? "text-red-600" : "text-blue-600"}`}>
                                                    {g.logFC > 0 ? "+" : ""}{g.logFC}
                                                </td>
                                                <td className="px-6 py-4">{g.pVal}</td>
                                                <td className="px-6 py-4">{g.adjP}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs border font-semibold ${g.reg === "UP" ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                                                        {g.reg}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="px-6 py-3 border-t border-gray-200 flex justify-between items-center bg-gray-50 rounded-b-lg">
                                    <span className="text-xs text-slate-500">Showing 1-5 of 1,204 results</span>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 rounded border border-gray-300 text-slate-600 text-xs bg-white">Previous</button>
                                        <button className="px-3 py-1 rounded border border-primary bg-primary text-white text-xs shadow-sm">1</button>
                                        <button className="px-3 py-1 rounded border border-gray-300 text-slate-600 text-xs bg-white">2</button>
                                        <button className="px-3 py-1 rounded border border-gray-300 text-slate-600 text-xs bg-white">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* AI Sidebar */}
                <aside className="w-96 flex-none border-l border-gray-200 bg-white flex flex-col shadow-xl z-20 hidden 2xl:flex">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-2 text-slate-900">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <h3 className="font-bold text-lg">Delta AI Insights</h3>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none mt-1">
                                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="bg-white p-4 rounded-xl rounded-tl-none border border-gray-200 shadow-sm">
                                    <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                        <strong className="text-slate-900 block mb-2">Primary Analysis</strong>
                                        The analysis identified <span className="text-slate-900 font-mono bg-gray-100 px-1 rounded border border-gray-200">1,204</span> significant DEGs. The most enriched pathway is <strong>Cytokine-cytokine receptor interaction</strong> (p &lt; 0.001), driven by the upregulation of <em className="text-slate-900">IL6</em>, <em className="text-slate-900">TNF</em>, and <em className="text-slate-900">CXCL8</em>.
                                    </p>
                                </div>
                                <span className="text-slate-400 text-xs">Generated 2 mins ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="flex flex-col gap-3">
                            <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary hover:bg-teal-700 text-white rounded-lg font-medium transition-all shadow-md shadow-teal-500/20">
                                <span className="material-symbols-outlined text-lg">refresh</span>
                                Generate New Insight
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
