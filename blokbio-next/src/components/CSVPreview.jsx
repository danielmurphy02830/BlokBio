"use client";
import { useState, useEffect } from "react";

export default function CSVPreview({ file, maxRows = 10 }) {
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!file) { setHeaders([]); setRows([]); return; }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const delimiter = file.name.endsWith(".tsv") ? "\t" : ",";
                const lines = text.split(/\r?\n/).filter(l => l.trim());
                if (lines.length === 0) { setError("File is empty"); return; }

                const hdr = lines[0].split(delimiter).map(h => h.replace(/^"|"$/g, "").trim());
                setHeaders(hdr);
                setTotalRows(lines.length - 1);

                const dataRows = lines.slice(1, maxRows + 1).map(line =>
                    line.split(delimiter).map(cell => cell.replace(/^"|"$/g, "").trim())
                );
                setRows(dataRows);
                setError(null);
            } catch {
                setError("Failed to parse file");
            }
        };
        reader.onerror = () => setError("Failed to read file");
        reader.readAsText(file);
    }, [file, maxRows]);

    if (!file) return null;
    if (error) return (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
    );
    if (headers.length === 0) return (
        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
            Parsing...
        </div>
    );

    return (
        <div className="mt-3 rounded-lg border border-gray-200 overflow-hidden bg-white">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-bold text-slate-600">
                    Preview: {Math.min(maxRows, totalRows)} of {totalRows} rows · {headers.length} columns
                </span>
            </div>
            <div className="overflow-x-auto max-h-[280px]">
                <table className="w-full text-left border-collapse text-xs">
                    <thead className="sticky top-0">
                        <tr className="bg-gray-50/95 backdrop-blur">
                            {headers.map((h, i) => (
                                <th key={i} className="px-3 py-2 font-semibold text-slate-600 border-b border-gray-200 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-gray-50">
                                {row.map((cell, ci) => (
                                    <td key={ci} className="px-3 py-1.5 text-slate-700 whitespace-nowrap font-mono">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
