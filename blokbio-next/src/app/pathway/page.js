"use client";
import Header from "@/components/Header";
import Link from "next/link";
import dynamic from "next/dynamic";

const PathwayDotPlot = dynamic(() => import("@/components/charts/PathwayDotPlot"), { ssr: false });

export default function PathwayPage() {
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
                        <span className="text-slate-900">Pathway Analysis</span>
                    </nav>

                    {/* Title */}
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b border-gray-200">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Pathway Enrichment Analysis</h1>
                            <p className="text-slate-500 mt-2 max-w-xl">Gene set enrichment via KEGG and Reactome databases. Bubble size reflects gene count, color indicates adjusted p-value.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="h-10 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Export
                            </button>
                            <Link href="/dgea" className="h-10 px-4 rounded-lg bg-white border border-gray-300 text-slate-700 text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to DGEA
                            </Link>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-2">Enriched Pathways</p>
                            <p className="text-3xl font-bold text-slate-900">48</p>
                        </div>
                        <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-2">Database</p>
                            <p className="text-3xl font-bold text-slate-900">KEGG</p>
                        </div>
                        <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-2">FDR Cutoff</p>
                            <p className="text-3xl font-bold text-slate-900">0.05</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-slate-900 font-bold text-lg">Enriched Pathways Dot Plot</h3>
                        </div>
                        <div className="h-[500px]">
                            <PathwayDotPlot />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>High p-adj</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Low p-adj</span>
                            </div>
                            <span>|</span>
                            <span>Bubble size = Gene count</span>
                        </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <Link href="/dgea" className="flex items-center gap-2 text-primary hover:text-teal-700 text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Back to Differential Expression
                        </Link>
                        <Link href="/contrast" className="flex items-center gap-2 text-primary hover:text-teal-700 text-sm font-medium transition-colors">
                            Contrast Analysis
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
