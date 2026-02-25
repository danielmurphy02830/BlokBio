"use client";
import { useChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import StaticPageLayout from "@/components/StaticPageLayout";

const suggestions = [
    "Summarize my QC results",
    "Compare control vs treated samples",
    "Explain the volcano plot",
    "List known drug targets in DEGs",
];

export default function GeneAIChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
        api: "/api/chat",
    });
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSuggestion = (text) => {
        append({ role: "user", content: text });
    };

    return (
        <StaticPageLayout
            title="GeneAI Assistant"
            subtitle="AI-powered genomic analysis assistant. Ask questions about your data in natural language."
            icon="auto_awesome"
            breadcrumb={[{ label: "GeneAI" }]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[600px]">
                        <div className="p-5 border-b border-gray-200 flex items-center gap-3 bg-gray-50 rounded-t-xl">
                            <div className="size-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="text-slate-900 font-bold">GeneAI v2.4</h3>
                                <p className="text-xs text-slate-500">Powered by Gemini</p>
                            </div>
                            <span className="ml-auto px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">Online</span>
                        </div>
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.length === 0 && (
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                                        <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-200 max-w-lg">
                                        <p className="text-slate-700 text-sm leading-relaxed">
                                            Welcome to GeneAI! I can help you interpret your genomic data, analyze differential expression results, and provide insights into pathway enrichment. How can I assist you today?
                                        </p>
                                    </div>
                                </div>
                            )}
                            {messages.map((m) => (
                                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                                    {m.role === "assistant" && (
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                                            <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-xl max-w-lg text-sm leading-relaxed ${m.role === "user"
                                            ? "bg-primary/10 rounded-tr-none border border-primary/20 text-slate-700"
                                            : "bg-gray-50 rounded-tl-none border border-gray-200 text-slate-700"
                                        }`}>
                                        <div className="whitespace-pre-wrap">{m.content}</div>
                                    </div>
                                    {m.role === "user" && (
                                        <div className="size-8 rounded-full bg-gradient-to-br from-primary to-teal-800 flex items-center justify-center flex-none text-white text-xs font-bold">DA</div>
                                    )}
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === "user" && (
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                                        <span className="material-symbols-outlined text-primary text-sm animate-spin">progress_activity</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-200 max-w-lg">
                                        <p className="text-slate-400 text-sm">Thinking...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <div className="flex items-center gap-3">
                                <input
                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Ask GeneAI about your data..."
                                    value={input}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="p-2.5 bg-primary rounded-lg text-white hover:bg-teal-700 transition-colors disabled:opacity-50">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-slate-900 font-bold mb-3">Suggested Prompts</h3>
                        <div className="flex flex-col gap-2">
                            {suggestions.map((p) => (
                                <button key={p} onClick={() => handleSuggestion(p)} className="text-left px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-slate-600 text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-slate-900 font-bold mb-3">Data Context</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-500">Active Project</span>
                                <span className="text-slate-900 font-medium">Mouse_Liver_Study_001</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-500">Samples</span>
                                <span className="text-slate-900 font-medium">12</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-slate-500">DEGs Found</span>
                                <span className="text-slate-900 font-medium">1,204</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StaticPageLayout>
    );
}
