import StaticPageLayout from "@/components/StaticPageLayout";

export default function DevSupportPage() {
    return (
        <StaticPageLayout title="Developer Support" subtitle="Get help from the BlokBio developer community." icon="support_agent" breadcrumb={[{ label: "Dev Portal", href: "/dev-portal" }, { label: "Support" }]}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: "Documentation", desc: "Complete API docs and guides", icon: "menu_book", action: "Browse Docs" },
                    { title: "Community Forum", desc: "Ask questions and share solutions", icon: "forum", action: "Join Forum" },
                    { title: "Priority Support", desc: "Enterprise SLA with dedicated team", icon: "headset_mic", action: "Contact Us" },
                ].map(s => (
                    <div key={s.title} className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm text-center">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary w-fit mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                        </div>
                        <h3 className="text-slate-900 font-bold mb-2">{s.title}</h3>
                        <p className="text-slate-500 text-sm mb-4">{s.desc}</p>
                        <button className="w-full h-10 rounded-lg border border-gray-300 bg-white text-slate-700 text-sm font-medium hover:bg-gray-50 transition-colors">{s.action}</button>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
