"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function ProjectDetailPage({ params }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resolvedId, setResolvedId] = useState(null);

    useEffect(() => {
        params.then(p => {
            setResolvedId(p.id);
            fetch(`/api/projects/${p.id}`)
                .then(r => r.json())
                .then(data => { setProject(data); setLoading(false); })
                .catch(() => setLoading(false));
        });
    }, [params]);

    if (loading) return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-[#637588]">
                    <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
                    <p className="mt-3">Loading project...</p>
                </div>
            </div>
        </div>
    );

    if (!project || project.error) return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">folder_off</span>
                    <h2 className="text-xl font-bold text-[#111418] mb-2">Project Not Found</h2>
                    <p className="text-[#637588] mb-4">ID: {resolvedId}</p>
                    <Link href="/workspaces" className="text-primary font-medium hover:underline">← Back to Workspaces</Link>
                </div>
            </div>
        </div>
    );

    const a = project.analysis;

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#f8fafc]">
                <div className="max-w-[1200px] mx-auto w-full p-6 md:p-10 flex flex-col gap-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm font-medium text-[#64748b]">
                        <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                        <span className="mx-2">/</span>
                        <Link className="hover:text-primary transition-colors" href="/workspaces">Projects</Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#0f172a]">{project.name}</span>
                    </nav>

                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a]">{project.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-[#64748b]">
                                <span>ID: #{project.id}</span>
                                <span>•</span>
                                <span>{project.organism}</span>
                                <span>•</span>
                                <span>{project.samples} samples</span>
                                <span>•</span>
                                <span>Owner: {project.owner}</span>
                            </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-full text-sm font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                            {project.status}
                        </span>
                    </div>

                    {/* Pipeline Progress */}
                    <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm">
                        <h2 className="text-[#0f172a] font-bold text-lg mb-4">Analysis Pipeline</h2>
                        <div className="flex items-center gap-0">
                            {[
                                { label: "Ingestion", icon: "upload_file", href: "/ingestion", done: true },
                                { label: "QC", icon: "analytics", href: `/qc?project=${project.id}`, done: true },
                                { label: "DGEA", icon: "science", href: `/dgea?project=${project.id}`, done: project.status !== "Pending" && project.status !== "Upload Pending" },
                                { label: "Pathway", icon: "alt_route", href: `/pathway?project=${project.id}`, done: project.status === "DGEA Complete" || project.status === "QC Passed" },
                                { label: "Report", icon: "description", href: "/report", done: project.status === "DGEA Complete" },
                            ].map((step, i, arr) => (
                                <div key={step.label} className="flex items-center flex-1">
                                    <Link href={step.href} className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors flex-1 ${step.done ? "hover:bg-primary/5" : "opacity-40 pointer-events-none"}`}>
                                        <div className={`size-10 rounded-full flex items-center justify-center ${step.done ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                                            <span className="material-symbols-outlined text-[20px]">{step.done ? "check" : step.icon}</span>
                                        </div>
                                        <span className={`text-xs font-medium ${step.done ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>{step.label}</span>
                                    </Link>
                                    {i < arr.length - 1 && <div className={`h-0.5 flex-1 ${step.done ? "bg-primary" : "bg-gray-200"}`}></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Cards */}
                    {a && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">analytics</span>
                                    <h3 className="text-[#0f172a] font-bold">QC Summary</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#64748b]">BlokScore™</span><span className="font-bold text-[#0f172a]">{a.qc.blokScore}/100</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">Read Depth</span><span className="font-mono text-[#0f172a]">{a.qc.readDepth}</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">Alignment</span><span className="font-mono text-[#0f172a]">{a.qc.alignmentRate}</span></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">science</span>
                                    <h3 className="text-[#0f172a] font-bold">DGEA Summary</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#64748b]">Total DEGs</span><span className="font-bold text-[#0f172a]">{a.dgea.totalDEGs.toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">Upregulated</span><span className="text-red-500 font-mono">↑ {a.dgea.upregulated}</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">Downregulated</span><span className="text-blue-500 font-mono">↓ {a.dgea.downregulated}</span></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">alt_route</span>
                                    <h3 className="text-[#0f172a] font-bold">Pathway Summary</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#64748b]">Enriched</span><span className="font-bold text-[#0f172a]">{a.pathway.enrichedPathways}</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">Database</span><span className="text-[#0f172a]">{a.pathway.database}</span></div>
                                    <div className="flex justify-between"><span className="text-[#64748b]">FDR Cutoff</span><span className="font-mono text-[#0f172a]">{a.pathway.fdrCutoff}</span></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Top Genes */}
                    {a?.dgea?.topGenes && (
                        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm">
                            <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between">
                                <h3 className="text-[#0f172a] font-bold text-lg">Top Differentially Expressed Genes</h3>
                                <Link href={`/dgea?project=${project.id}`} className="text-primary text-sm font-medium hover:underline">View All →</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 text-[#64748b] text-xs uppercase tracking-wider border-b border-[#e2e8f0]">
                                            <th className="p-4">Gene</th>
                                            <th className="p-4">Ensembl ID</th>
                                            <th className="p-4">Log2FC</th>
                                            <th className="p-4">Adj. P-value</th>
                                            <th className="p-4">Regulation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e2e8f0]">
                                        {a.dgea.topGenes.map(g => (
                                            <tr key={g.symbol} className="hover:bg-gray-50">
                                                <td className="p-4 font-mono font-bold text-[#0f172a]">{g.symbol}</td>
                                                <td className="p-4 text-[#64748b] font-mono text-xs">{g.id}</td>
                                                <td className={`p-4 font-mono ${g.logFC > 0 ? "text-red-500" : "text-blue-500"}`}>{g.logFC > 0 ? "+" : ""}{g.logFC}</td>
                                                <td className="p-4 font-mono text-[#64748b]">{g.adjP}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${g.reg === "UP" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>{g.reg}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
