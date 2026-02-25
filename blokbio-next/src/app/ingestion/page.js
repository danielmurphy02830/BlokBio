"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";

export default function IngestionPage() {
    const [countsFile, setCountsFile] = useState(null);
    const [metadataFile, setMetadataFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadResults, setUploadResults] = useState([]);
    const [error, setError] = useState(null);
    const countsRef = useRef(null);
    const metadataRef = useRef(null);

    const handleUpload = async () => {
        if (!countsFile && !metadataFile) return;
        setUploading(true);
        setError(null);
        const results = [];

        for (const file of [countsFile, metadataFile].filter(Boolean)) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/upload", { method: "POST", body: formData });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Upload failed");
                results.push({ name: file.name, size: file.size, url: data.url, message: data.message });
            } catch (e) {
                setError(e.message);
            }
        }

        setUploadResults(results);
        setUploading(false);
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            <Header title="Delta (BlokBio)" />
            <div className="flex h-full grow flex-col bg-white">
                <div className="px-4 md:px-12 lg:px-40 flex flex-1 justify-center py-8">
                    <div className="flex flex-col max-w-[1024px] flex-1">
                        {/* Breadcrumb */}
                        <nav className="flex flex-wrap gap-2 px-4 pb-4 items-center">
                            <Link className="text-[#6b7280] hover:text-primary transition-colors text-sm font-medium leading-normal flex items-center gap-1" href="/">
                                <span className="material-symbols-outlined text-[18px]">home</span>
                            </Link>
                            <span className="text-[#6b7280] text-sm font-medium leading-normal">/</span>
                            <span className="text-[#6b7280] text-sm font-medium leading-normal">New Analysis</span>
                            <span className="text-[#6b7280] text-sm font-medium leading-normal">/</span>
                            <span className="text-[#111827] text-sm font-medium leading-normal">Data Ingestion</span>
                        </nav>

                        {/* Title */}
                        <div className="flex flex-wrap justify-between items-end gap-6 px-4 pb-8">
                            <div className="flex flex-col gap-2 max-w-2xl">
                                <h1 className="text-[#111827] text-3xl md:text-4xl font-bold leading-tight tracking-[-0.033em]">Upload Genomic Data</h1>
                                <p className="text-[#6b7280] text-base font-normal leading-relaxed">
                                    Import your raw gene counts and sample metadata to begin the automated RNA-seq pipeline.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[16px] icon-filled">lock</span>
                                <span>End-to-End Encrypted</span>
                            </div>
                        </div>

                        {/* Upload Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                            {/* Gene Counts Card */}
                            <div className="group relative flex flex-col rounded-xl bg-white border border-[#e5e7eb] p-1 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                                <div className={`flex flex-col h-full rounded-lg border-2 border-dashed ${countsFile ? "border-primary bg-primary/5" : "border-gray-200 group-hover:border-primary/40 bg-gray-50/50"} p-8 transition-colors`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-teal-100/50 rounded-lg text-primary">
                                            <span className="material-symbols-outlined text-3xl">table_chart</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#6b7280] bg-gray-100 px-2 py-1 rounded border border-gray-200">Required</span>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-6">
                                        <h3 className="text-[#111827] text-xl font-bold">Gene Counts Matrix</h3>
                                        <p className="text-[#6b7280] text-sm">
                                            {countsFile ? (
                                                <span className="text-primary font-medium flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                    {countsFile.name} ({formatSize(countsFile.size)})
                                                </span>
                                            ) : "Drag & drop CSV/TSV files here."}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-4">
                                        <label className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#111827] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                            {countsFile ? "Change File" : "Choose File"}
                                            <input ref={countsRef} type="file" accept=".csv,.tsv" className="hidden" onChange={(e) => setCountsFile(e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Metadata Card */}
                            <div className="group relative flex flex-col rounded-xl bg-white border border-[#e5e7eb] p-1 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                                <div className={`flex flex-col h-full rounded-lg border-2 border-dashed ${metadataFile ? "border-primary bg-primary/5" : "border-gray-200 group-hover:border-primary/40 bg-gray-50/50"} p-8 transition-colors`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                            <span className="material-symbols-outlined text-3xl">description</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#6b7280] bg-gray-100 px-2 py-1 rounded border border-gray-200">Required</span>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-6">
                                        <h3 className="text-[#111827] text-xl font-bold">Sample Metadata</h3>
                                        <p className="text-[#6b7280] text-sm">
                                            {metadataFile ? (
                                                <span className="text-primary font-medium flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                    {metadataFile.name} ({formatSize(metadataFile.size)})
                                                </span>
                                            ) : "Upload experimental design table."}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-4">
                                        <label className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#111827] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                            {metadataFile ? "Change File" : "Choose File"}
                                            <input ref={metadataRef} type="file" accept=".csv,.tsv" className="hidden" onChange={(e) => setMetadataFile(e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* S3 Section */}
                        <div className="px-4 mt-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gray-50 border border-[#e5e7eb]">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                        <span className="material-symbols-outlined text-2xl">cloud_sync</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-[#111827] font-bold text-base">Reload from S3</h4>
                                        <p className="text-[#6b7280] text-sm">Connect your AWS bucket to import large datasets directly.</p>
                                    </div>
                                </div>
                                <button className="whitespace-nowrap flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white border border-[#e5e7eb] hover:border-orange-500 hover:text-orange-600 text-[#111827] text-sm font-bold transition-colors shadow-sm">
                                    <span>Browse Buckets</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Upload Results */}
                        {uploadResults.length > 0 && (
                            <div className="px-4 mt-6">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                                        <h4 className="text-emerald-800 font-bold">Upload Complete</h4>
                                    </div>
                                    {uploadResults.map((r) => (
                                        <div key={r.name} className="text-emerald-700 text-sm py-1">
                                            <span className="font-medium">{r.name}</span> — {formatSize(r.size)}
                                            {r.message && <span className="text-emerald-500 ml-2 text-xs">({r.message})</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="px-4 mt-4">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Bottom Action Bar */}
                        <div className="px-4 mt-8 mb-12">
                            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
                                <div className="flex flex-col gap-4">
                                    {(countsFile || metadataFile) && (
                                        <div className="flex flex-col gap-3">
                                            {[countsFile, metadataFile].filter(Boolean).map((f) => (
                                                <div key={f.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-[#e5e7eb]">
                                                    <div className="p-2 bg-teal-100/50 rounded text-primary">
                                                        <span className="material-symbols-outlined text-xl">table_chart</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-[#111827] text-sm font-medium truncate block">{f.name}</span>
                                                        <span className="text-[#637588] text-xs">{formatSize(f.size)}</span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="h-px bg-[#e5e7eb] my-2"></div>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                            <span className="material-symbols-outlined text-[18px] text-amber-500">info</span>
                                            <span>Both files are required to proceed with analysis.</span>
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <button onClick={handleUpload}
                                                disabled={(!countsFile && !metadataFile) || uploading}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold border border-primary hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                {uploading ? (
                                                    <>
                                                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                                                        Upload Files
                                                    </>
                                                )}
                                            </button>
                                            {uploadResults.length > 0 && (
                                                <Link href="/qc"
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-8 rounded-lg bg-primary text-white cursor-pointer text-sm font-bold border border-primary hover:bg-teal-700 transition-colors">
                                                    <span>Analyze Data</span>
                                                    <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
