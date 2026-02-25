import Link from "next/link";

export default function Header({ title = "Delta (BlokBio)" }) {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] bg-white/95 backdrop-blur-md px-6 py-3 lg:px-10 shadow-sm">
            <div className="flex items-center gap-4 text-[#111827]">
                <Link href="/" className="size-8 flex items-center justify-center bg-[#f0fdfa] rounded-lg text-primary">
                    <span className="material-symbols-outlined">biotech</span>
                </Link>
                <h2 className="text-[#111827] text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
                <button className="hidden md:flex items-center gap-2 text-[#6b7280] hover:text-primary transition-colors text-sm font-medium">
                    <span className="material-symbols-outlined text-[20px]">help</span>
                    <span>Documentation</span>
                </button>
                <div className="h-6 w-px bg-[#e5e7eb]"></div>
                <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-white hover:bg-gray-50 border border-[#e5e7eb] text-[#111827] text-sm font-bold transition-colors">
                    <span className="truncate">Settings</span>
                </button>
                <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-[#e5e7eb] cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all bg-gradient-to-tr from-primary to-teal-800"
                ></div>
            </div>
        </header>
    );
}
