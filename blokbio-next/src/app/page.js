import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { projects } from "@/lib/mock-data";

const statusStyles = {
  "QC Passed": { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", dot: "bg-emerald-500", icon: null },
  "Processing": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", dot: null, icon: "progress_activity" },
  "DGEA Complete": { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200", dot: null, icon: "check_circle" },
  "Upload Pending": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", dot: null, icon: "cloud_upload" },
};

export default function HomePage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white relative">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#e5e7eb] bg-white">
          <span className="material-symbols-outlined text-primary">hub</span>
          <span className="material-symbols-outlined text-[#111418]">menu</span>
        </div>
        <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 md:p-10 gap-8">
          {/* Welcome */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111418]">Welcome back, Dr. Aris</h1>
              <div className="flex items-center gap-2 text-sm md:text-base text-[#637588]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Status: Online
                </span>
                <span className="opacity-50">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs" style={{ fontSize: "16px" }}>cloud_sync</span>
                  AWS Lambda Engine: Active
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center h-10 px-4 rounded-lg border border-[#d1d5db] text-[#111418] bg-white hover:bg-gray-50 text-sm font-medium transition-colors">
                View Logs
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col p-5 rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#637588] text-sm font-medium uppercase tracking-wider">Samples Processed</p>
                <span className="material-symbols-outlined text-primary">biotech</span>
              </div>
              <p className="text-3xl font-bold text-[#111418]">1,248</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" style={{ fontSize: "14px" }}>trending_up</span>
                +12% this week
              </p>
            </div>
            <div className="flex flex-col p-5 rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#637588] text-sm font-medium uppercase tracking-wider">Active Jobs</p>
                <span className="material-symbols-outlined text-primary">memory</span>
              </div>
              <p className="text-3xl font-bold text-[#111418]">3</p>
              <p className="text-xs text-[#637588] mt-1">2 Queued, 1 Running</p>
            </div>
            <div className="flex flex-col p-5 rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#637588] text-sm font-medium uppercase tracking-wider">Storage Used</p>
                <span className="material-symbols-outlined text-primary">hard_drive</span>
              </div>
              <p className="text-3xl font-bold text-[#111418]">450 <span className="text-lg font-medium text-[#637588]">GB</span></p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col lg:flex-row items-stretch rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden group">
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-50 text-teal-700 w-fit">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span className="text-xs font-bold uppercase tracking-wide">Lambda Engine Ready</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111418] mb-2">Delta: Bulk RNA-seq</h2>
                <p className="text-[#637588] text-base md:text-lg max-w-xl">
                  Raw FASTQ to Differential Expression in minutes. Automate your transition from raw genomic data to biological insight using our serverless pipeline.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/ingestion"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-all shadow-lg shadow-teal-500/20 active:scale-95">
                  <span className="material-symbols-outlined">add</span>
                  Start New Project
                </Link>
              </div>
            </div>
            <div className="lg:w-2/5 min-h-[240px] bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqpOuTLrLoL63czIWwTXS6zcxv3bZYZQ18F7AQm0WzvfPedUS9pY7QqgI68iBh5WrQ0l6LHAtp62-aRjGmpf-grsO21P_qrkDP5xZtmtWjFxLAU7JcCnZge2NrEhsdavu7qw5iZTt1NTkIEJko3Us2NnulM-jz5RlRRaxFVZ1RvWNbabIuPr7hiSGrRWLnSV7YZm8I_HQ1nO1xduwV-8lnkTBRPdB2mC0fkRxc2ezMcRY6bRbOZbWQevDHAkl1nfQdYki58o-PD6xO')" }}>
              <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-white"></div>
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-xl font-bold text-[#111418]">Ongoing Projects</h3>
              <div className="relative w-full md:w-96 group/search">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#637588]">search</span>
                </div>
                <input className="block w-full pl-10 pr-3 py-2.5 border border-[#e5e7eb] rounded-lg leading-5 bg-white text-[#111418] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                  placeholder="Search by name, ID, or organism..." type="text" />
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#e5e7eb]">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588]">Project Name</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588]">Organism</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588]">Samples</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588]">Last Updated</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588]">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#637588] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]" style={{ fontFamily: "var(--font-body)" }}>
                  {projects.map((p) => {
                    const s = statusStyles[p.status] || statusStyles["QC Passed"];
                    return (
                      <tr key={p.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#111418]">{p.name}</span>
                            <span className="text-xs text-[#637588]">ID: #{p.id}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-[#111418]">{p.organism}</td>
                        <td className="py-4 px-6 text-sm text-[#111418]">{p.samples}</td>
                        <td className="py-4 px-6 text-sm text-[#111418]">{p.lastUpdated}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text} border ${s.border}`}>
                            {s.dot && <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>}
                            {s.icon && <span className="material-symbols-outlined text-xs" style={{ fontSize: "12px" }}>{s.icon}</span>}
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-primary hover:text-teal-700 text-sm font-medium">View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
