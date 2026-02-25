import Header from "@/components/Header";
import Link from "next/link";

export default function IngestionPage() {
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
                            <div className="group relative flex flex-col rounded-xl bg-white border border-[#e5e7eb] p-1 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                                <div className="flex flex-col h-full rounded-lg border-2 border-dashed border-gray-200 group-hover:border-primary/40 bg-gray-50/50 p-8 transition-colors">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-teal-100/50 rounded-lg text-primary">
                                            <span className="material-symbols-outlined text-3xl">table_chart</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#6b7280] bg-gray-100 px-2 py-1 rounded border border-gray-200">Required</span>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-6">
                                        <h3 className="text-[#111827] text-xl font-bold">Gene Counts Matrix</h3>
                                        <p className="text-[#6b7280] text-sm">Drag & drop CSV/TSV files here.</p>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-4">
                                        <label className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#111827] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                            Choose File
                                            <input type="file" accept=".csv,.tsv" className="hidden" />
                                        </label>
                                        <a className="text-gray-500 hover:text-primary text-xs text-center font-medium underline decoration-dashed underline-offset-4 transition-colors" href="#">Download Sample Template (.csv)</a>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative flex flex-col rounded-xl bg-white border border-[#e5e7eb] p-1 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                                <div className="flex flex-col h-full rounded-lg border-2 border-dashed border-gray-200 group-hover:border-primary/40 bg-gray-50/50 p-8 transition-colors">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                            <span className="material-symbols-outlined text-3xl">description</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#6b7280] bg-gray-100 px-2 py-1 rounded border border-gray-200">Required</span>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-6">
                                        <h3 className="text-[#111827] text-xl font-bold">Sample Metadata</h3>
                                        <p className="text-[#6b7280] text-sm">Upload experimental design table.</p>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-4">
                                        <label className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#111827] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                            Choose File
                                            <input type="file" accept=".csv,.tsv" className="hidden" />
                                        </label>
                                        <a className="text-gray-500 hover:text-primary text-xs text-center font-medium underline decoration-dashed underline-offset-4 transition-colors" href="#">Download Sample Template (.csv)</a>
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

                        {/* Bottom Action Bar */}
                        <div className="px-4 mt-8 mb-12">
                            <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-[#e5e7eb]">
                                        <div className="p-2 bg-teal-100/50 rounded text-primary">
                                            <span className="material-symbols-outlined text-xl">table_chart</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-[#111827] text-sm font-medium truncate">raw_counts_batch_24.csv</span>
                                                <span className="text-primary text-xs font-bold">Uploading... 45%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-[45%] rounded-full"></div>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-xl">cancel</span>
                                        </button>
                                    </div>
                                    <div className="h-px bg-[#e5e7eb] my-2"></div>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                            <span className="material-symbols-outlined text-[18px] text-amber-500">info</span>
                                            <span>Both files are required to proceed with analysis.</span>
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <button className="flex-1 md:flex-none h-10 px-6 rounded-lg text-sm font-bold text-gray-500 hover:text-[#111827] transition-colors">
                                                Cancel
                                            </button>
                                            <Link href="/qc"
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-8 rounded-lg bg-primary text-white cursor-pointer text-sm font-bold border border-primary hover:bg-teal-700 transition-colors">
                                                <span>Analyze Data</span>
                                                <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                                            </Link>
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
