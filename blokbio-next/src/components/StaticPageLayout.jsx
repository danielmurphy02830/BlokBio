import Header from "@/components/Header";
import Link from "next/link";

export default function StaticPageLayout({ title, subtitle, icon, breadcrumb = [], children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            <Header title="Delta (BlokBio)" />
            <div className="flex-1 px-4 md:px-12 lg:px-40 py-8 bg-white">
                <div className="max-w-[1024px] mx-auto flex flex-col gap-6">
                    {/* Breadcrumb */}
                    {breadcrumb.length > 0 && (
                        <nav className="flex items-center text-sm font-medium text-[#64748b]">
                            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                            {breadcrumb.map((item, i) => (
                                <span key={i} className="flex items-center">
                                    <span className="mx-2">/</span>
                                    {item.href ? (
                                        <Link className="hover:text-primary transition-colors" href={item.href}>{item.label}</Link>
                                    ) : (
                                        <span className="text-slate-900">{item.label}</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}

                    {/* Title */}
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            {icon && (
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-slate-900 text-3xl font-bold tracking-tight">{title}</h1>
                                {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
                            </div>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
