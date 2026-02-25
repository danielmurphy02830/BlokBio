"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/mock-data";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 flex-shrink-0 border-r border-[#e5e7eb] bg-white flex flex-col justify-between p-4 hidden md:flex">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col px-2">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                        <h1 className="text-xl font-bold tracking-tight">BlokBio</h1>
                    </div>
                    <p className="text-[#637588] text-xs font-normal">Genomics Engine v2.4</p>
                </div>
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && item.href !== "#";
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-[#111418] hover:bg-gray-50"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#111418] hover:bg-gray-50 transition-colors"
                >
                    <span className="material-symbols-outlined">menu_book</span>
                    <span className="text-sm font-medium">Documentation</span>
                </Link>
                <div className="mt-4 pt-4 border-t border-[#e5e7eb] flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-teal-800 flex items-center justify-center text-white text-xs font-bold">
                        DA
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">Dr. Aris</p>
                        <p className="text-xs text-[#637588] mt-1">Free Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
