import StaticPageLayout from "@/components/StaticPageLayout";

const policies = [
    { title: "Data Access Control", desc: "Role-based access control for all genomic datasets", icon: "admin_panel_settings", status: "Active", severity: "critical" },
    { title: "Audit Logging", desc: "Complete audit trail of all user actions and data access events", icon: "receipt_long", status: "Active", severity: "critical" },
    { title: "HIPAA Compliance", desc: "Automated HIPAA compliance checks and reporting", icon: "verified_user", status: "Active", severity: "high" },
    { title: "Data Retention", desc: "Configurable data retention policies with automated cleanup", icon: "delete_sweep", status: "Review", severity: "medium" },
    { title: "Encryption Standards", desc: "AES-256 encryption at rest, TLS 1.3 in transit", icon: "lock", status: "Active", severity: "critical" },
    { title: "User Authentication", desc: "MFA, SSO, and LDAP integration for enterprise deployments", icon: "fingerprint", status: "Active", severity: "high" },
];

export default function GovernancePage() {
    return (
        <StaticPageLayout
            title="Data Governance"
            subtitle="Manage compliance, access controls, and audit policies for your genomic data."
            icon="shield"
            breadcrumb={[{ label: "Governance" }]}
        >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Policies", value: "12", icon: "policy", color: "text-primary" },
                    { label: "Compliance Score", value: "98%", icon: "verified", color: "text-emerald-600" },
                    { label: "Audit Events", value: "2.4K", icon: "receipt_long", color: "text-blue-600" },
                    { label: "Users", value: "34", icon: "group", color: "text-purple-600" },
                ].map(s => (
                    <div key={s.label} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className={`flex items-center gap-2 mb-2 ${s.color}`}>
                            <span className="material-symbols-outlined text-lg">{s.icon}</span>
                            <p className="text-sm font-medium text-slate-500">{s.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-4">
                <h3 className="text-slate-900 text-lg font-bold">Security Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policies.map(p => (
                        <div key={p.title} className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm flex items-start gap-4">
                            <div className="p-2.5 bg-primary/10 rounded-lg text-primary flex-none">
                                <span className="material-symbols-outlined">{p.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-slate-900 font-bold text-sm">{p.title}</h4>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${p.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                                        }`}>{p.status}</span>
                                </div>
                                <p className="text-slate-500 text-sm">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StaticPageLayout>
    );
}
