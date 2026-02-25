import StaticPageLayout from "@/components/StaticPageLayout";

const connectors = [
    { name: "AWS S3", desc: "Import files from Amazon S3 buckets", icon: "cloud", status: "Connected", color: "text-orange-600" },
    { name: "Google Cloud Storage", desc: "Sync with GCS buckets", icon: "cloud_circle", status: "Available", color: "text-blue-600" },
    { name: "Azure Blob", desc: "Connect to Azure storage containers", icon: "cloud_queue", status: "Available", color: "text-cyan-600" },
    { name: "Illumina BaseSpace", desc: "Direct import from BaseSpace Sequence Hub", icon: "biotech", status: "Coming Soon", color: "text-purple-600" },
    { name: "SRA / GEO", desc: "Download public datasets from NCBI", icon: "public", status: "Connected", color: "text-green-600" },
    { name: "Galaxy Server", desc: "Integrate with Galaxy workflows", icon: "hub", status: "Available", color: "text-yellow-600" },
];

export default function ConnectorPage() {
    return (
        <StaticPageLayout
            title="Data Connectors"
            subtitle="Connect external data sources and cloud storage to your BlokBio workspace."
            icon="cable"
            breadcrumb={[{ label: "Connectors" }]}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectors.map(c => (
                    <div key={c.name} className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`p-3 bg-gray-100 rounded-xl ${c.color}`}>
                                <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-slate-900 font-bold">{c.name}</h3>
                                <p className="text-slate-500 text-sm mt-1">{c.desc}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${c.status === "Connected" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                    c.status === "Available" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                        "bg-gray-50 text-gray-500 border-gray-200"
                                }`}>{c.status}</span>
                            <button className={`text-sm font-medium ${c.status === "Coming Soon" ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-teal-700"} transition-colors`}>
                                {c.status === "Connected" ? "Configure" : c.status === "Available" ? "Connect" : "Notify Me"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
