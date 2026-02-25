import StaticPageLayout from "@/components/StaticPageLayout";

export default function DevSandboxPage() {
    return (
        <StaticPageLayout title="API Sandbox" subtitle="Test API calls with sample data in a safe environment." icon="science" breadcrumb={[{ label: "Dev Portal", href: "/dev-portal" }, { label: "Sandbox" }]}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-900 text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">terminal</span>
                        <span className="text-sm font-bold">Request</span>
                    </div>
                    <pre className="p-4 bg-slate-950 text-green-400 text-sm font-mono overflow-x-auto min-h-[300px]">
                        {`GET /v2/projects HTTP/1.1
Host: sandbox.blokbio.com
Authorization: Bearer bk_test_demo123
Content-Type: application/json
Accept: application/json`}
                    </pre>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 bg-green-900 text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span className="text-sm font-bold">Response (200 OK)</span>
                    </div>
                    <pre className="p-4 bg-slate-950 text-blue-400 text-sm font-mono overflow-x-auto min-h-[300px]">
                        {`{
  "data": [
    {
      "id": "DLT-8921",
      "name": "Mouse_Liver_Study_001",
      "organism": "Mus musculus",
      "samples": 12,
      "status": "QC Passed"
    }
  ],
  "total": 4,
  "page": 1
}`}
                    </pre>
                </div>
            </div>
            <button className="w-fit flex items-center gap-2 bg-primary hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-all text-sm">
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                Send Request
            </button>
        </StaticPageLayout>
    );
}
