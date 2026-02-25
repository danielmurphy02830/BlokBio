"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const statusStyles = {
    "QC Passed": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Processing": "bg-teal-50 text-teal-700 border-teal-200",
    "DGEA Complete": "bg-purple-50 text-purple-700 border-purple-200",
    "Upload Pending": "bg-amber-50 text-amber-700 border-amber-200",
    "Pending": "bg-gray-50 text-gray-600 border-gray-200",
};

export default function WorkspacesPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((data) => { setProjects(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = projects.filter((p) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return p.name?.toLowerCase().includes(q) || p.id?.toLowerCase().includes(q) || p.organism?.toLowerCase().includes(q) || p.owner?.toLowerCase().includes(q);
    });

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white">
                <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 md:p-10 gap-8">
                    {/* Title */}
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold tracking-tight text-[#111418]">Project Workspaces</h1>
                            <p className="text-[#637588] text-base">Manage all your RNA-seq analysis projects in one place.</p>
                        </div>
                        <Link href="/ingestion" className="flex items-center gap-2 bg-primary hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-teal-500/20 text-sm">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            New Project
                        </Link>
                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#637588]">search</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2.5 border border-[#e5e7eb] rounded-lg bg-white text-[#111418] placeholder-[#9ca3af] focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                placeholder="Search projects..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="flex gap-2">
                            <button className="h-10 px-4 rounded-lg border border-[#e5e7eb] text-[#111418] bg-white hover:bg-gray-50 text-sm font-medium transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                Filter
                            </button>
                            <button className="h-10 px-4 rounded-lg border border-[#e5e7eb] text-[#111418] bg-white hover:bg-gray-50 text-sm font-medium transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">sort</span>
                                Sort
                            </button>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {loading ? (
                        <div className="text-center py-12 text-[#637588]">
                            <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                            <p className="mt-2 text-sm">Loading projects...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12 text-[#637588]">
                            <span className="material-symbols-outlined text-3xl mb-2">search_off</span>
                            <p className="text-sm">No projects match &quot;{search}&quot;</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filtered.map((p) => (
                                <Link key={p.id} href={`/projects/${p.id}`} className="rounded-xl border border-[#e5e7eb] p-6 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer block">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-[#111418] font-bold text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                                            <p className="text-[#637588] text-sm">ID: #{p.id}</p>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[p.status] || statusStyles["Pending"]}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-[#637588] text-xs mb-0.5">Organism</p>
                                            <p className="text-[#111418] font-medium">{p.organism}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#637588] text-xs mb-0.5">Samples</p>
                                            <p className="text-[#111418] font-medium">{p.samples}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#637588] text-xs mb-0.5">Owner</p>
                                            <p className="text-[#111418] font-medium">{p.owner}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#e5e7eb]">
                                        <span className="text-xs text-[#637588]">Updated {p.lastUpdated}</span>
                                        <span className="text-primary hover:text-teal-700 text-sm font-medium transition-colors flex items-center gap-1">
                                            Open
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
