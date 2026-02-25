"use client";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { qcSamples } from "@/lib/mock-data";
import dynamic from "next/dynamic";
import React from "react";

const PCAPlot = dynamic(() => import("@/components/charts/PCAPlot"), { ssr: false });

export default function QCPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
            <Sidebar />
            <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden bg-[#f8fafc]">
                <header className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-3 bg-white shrink-0 z-10">
                    <div className="flex items-center gap-4 text-[#0f172a] flex-1">
                        <h2 className="text-[#0f172a] text-lg font-bold leading-tight">Delta Analysis Engine</h2>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className="flex flex-col min-w-40 h-9 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748b]">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </div>
                                <input className="block w-full rounded-lg border-none bg-[#f1f5f9] py-2 pl-10 pr-3 text-sm text-[#0f172a] placeholder-slate-400 focus:ring-1 focus:ring-primary" placeholder="Search experiments..." />
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                        {/* Breadcrumb */}
                        <nav className="flex items-center text-sm font-medium text-[#64748b]">
                            <Link className="hover:text-primary transition-colors" href="/">Project Alpha</Link>
                            <span className="mx-2">/</span>
                            <span>RNA-Seq Analysis</span>
                            <span className="mx-2">/</span>
                            <span className="text-[#0f172a]">QC</span>
                        </nav>

                        {/* Title */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-[#0f172a] text-3xl md:text-4xl font-bold tracking-tight">Quality Control Assessment</h1>
                                <p className="text-[#64748b] max-w-2xl">Review automated QC metrics and AI-driven insights for 12 samples before proceeding to Differential Expression.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="h-10 px-4 rounded-lg bg-white border border-[#e2e8f0] text-[#0f172a] text-sm font-bold hover:bg-[#f1f5f9] transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                    <span>Report</span>
                                </button>
                                <Link href="/dgea" className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-[#0f766e] transition-colors shadow-lg shadow-teal-900/10 flex items-center gap-2">
                                    <span>Proceed to DE</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        {/* BlokScore + AI */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-4 bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-[120px] text-[#10b981]">verified</span>
                                </div>
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-[#64748b] text-sm font-bold uppercase tracking-wider">BlokScore™</h3>
                                            <span className="material-symbols-outlined text-[#64748b] text-[16px]" title="Proprietary Quality Metric">info</span>
                                        </div>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-6xl font-black text-[#0f172a]">94</span>
                                            <span className="text-xl font-medium text-[#64748b]">/100</span>
                                        </div>
                                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
                                            <div className="size-2 rounded-full bg-[#10b981] animate-pulse"></div>
                                            <span className="text-[#10b981] text-sm font-bold">STATUS: PASS</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#64748b]">Read Depth</span>
                                            <span className="text-[#0f172a] font-mono">25M+</span>
                                        </div>
                                        <div className="w-full bg-[#f1f5f9] rounded-full h-1.5 mb-3">
                                            <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: "92%" }}></div>
                                        </div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#64748b]">Alignment Rate</span>
                                            <span className="text-[#0f172a] font-mono">98.2%</span>
                                        </div>
                                        <div className="w-full bg-[#f1f5f9] rounded-full h-1.5">
                                            <div className="bg-primary h-1.5 rounded-full" style={{ width: "98%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-8 bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined ai-gradient-text text-[24px]">auto_awesome</span>
                                    <h3 className="text-[#0f172a] text-lg font-bold">AI Interpretation</h3>
                                </div>
                                <div className="flex-1 text-slate-600 leading-relaxed space-y-3" style={{ fontFamily: "var(--font-body)" }}>
                                    <p><strong className="text-slate-800">Batch Effect Analysis:</strong> No significant batch effects detected across the 3 experimental conditions. The variance is primarily driven by biological factors (PC1: 45%).</p>
                                    <p><strong className="text-slate-800">Outlier Detection:</strong> Sample <span className="font-mono text-[#f59e0b] bg-[#f59e0b]/10 px-1 rounded border border-[#f59e0b]/20">Control_03</span> shows slight divergence in the PCA plot but remains within acceptable 2σ bounds.</p>
                                    <p className="text-sm text-[#64748b] italic mt-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        Recommended Action: Proceed with differential expression analysis.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col h-[450px]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-[#0f172a] font-bold text-lg">PCA Scatter Plot</h3>
                                        <p className="text-[#64748b] text-xs">PC1 vs PC2 • Top 500 variable genes</p>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <PCAPlot />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col h-[450px]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-[#0f172a] font-bold text-lg">Sample Distance Heatmap</h3>
                                        <p className="text-[#64748b] text-xs">Euclidean Distance Matrix</p>
                                    </div>
                                </div>
                                {/* CSS-based heatmap from the template */}
                                <div className="flex-1 grid grid-cols-6 gap-[1px] bg-gray-100 rounded overflow-hidden border border-gray-100">
                                    <div className="bg-white"></div>
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
                                        <React.Fragment key={row.gene}>
                                            <div className="bg-white text-slate-700 text-xs py-1 px-2 font-mono truncate font-semibold">{row.gene}</div>
                                            {row.colors.map((c, i) => <div key={i} className={`${c} h-6`}></div>)}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#64748b]">
                                    <span>Similar</span>
                                    <div className="h-2 w-24 rounded-full bg-gradient-to-r from-[#0f172a] to-[#f1f5f9]"></div>
                                    <span>Dissimilar</span>
                                </div>
                            </div>
                        </div>

                        {/* Sample Metrics Table */}
                        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between">
                                <h3 className="text-[#0f172a] font-bold text-lg">Detailed Sample Metrics</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#f1f5f9] text-[#64748b] text-xs uppercase tracking-wider font-semibold border-b border-[#e2e8f0]">
                                            <th className="p-4">Sample ID</th>
                                            <th className="p-4">Condition</th>
                                            <th className="p-4">Total Reads</th>
                                            <th className="p-4">Mapped %</th>
                                            <th className="p-4">Duplication</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-[#e2e8f0]">
                                        {qcSamples.map((s) => (
                                            <tr key={s.id} className={`hover:bg-[#f1f5f9] transition-colors ${s.status === "warning" ? "bg-[#f59e0b]/5 border-l-2 border-[#f59e0b]" : ""}`}>
                                                <td className="p-4 font-mono text-[#0f172a]">{s.id}</td>
                                                <td className="p-4 text-[#64748b]">{s.condition}</td>
                                                <td className="p-4 text-[#64748b]">{s.reads}</td>
                                                <td className={`p-4 ${s.status === "warning" ? "text-[#f59e0b] font-semibold" : "text-[#10b981]"}`}>{s.mapped}</td>
                                                <td className={`p-4 ${s.status === "warning" ? "text-[#f59e0b]" : "text-[#64748b]"}`}>{s.duplication}</td>
                                                <td className="p-4">
                                                    <span className={`inline-block size-2 rounded-full ${s.status === "warning" ? "bg-[#f59e0b]" : "bg-[#10b981]"}`}></span>
                                                    {s.status === "warning" && <span className="text-xs text-[#f59e0b] font-bold ml-2">Deviant</span>}
                                                </td>
                                                <td className="p-4">
                                                    <button className="text-primary hover:text-[#0f766e] font-medium text-xs">View FastQC</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
