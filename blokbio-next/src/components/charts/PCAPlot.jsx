"use client";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { generatePCAData } from "@/lib/mock-data";

export default function PCAPlot({ data: externalData }) {
    const data = externalData || generatePCAData();
    const groups = [...new Set(data.map(d => d.group))];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis type="number" dataKey="x" name="PC1" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "PC1 (45%)", position: "insideBottom", offset: -10, style: { fontSize: 12, fill: "#64748b" } }} />
                <YAxis type="number" dataKey="y" name="PC2" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "PC2 (21%)", angle: -90, position: "insideLeft", offset: 5, style: { fontSize: 12, fill: "#64748b" } }} />
                <Tooltip content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const pt = payload[0].payload;
                    return (
                        <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                            <p className="font-bold">{pt.label}</p>
                            <p>Group: {pt.group}</p>
                            <p>PC1: {pt.x} | PC2: {pt.y}</p>
                        </div>
                    );
                }} />
                <Legend content={() => (
                    <div className="flex justify-center gap-4 mt-2">
                        {groups.map((g) => (
                            <div key={g} className="flex items-center gap-1.5 text-xs text-slate-600">
                                <div className="w-3 h-3 rounded-full" style={{ background: data.find(d => d.group === g)?.color }}></div>
                                {g}
                            </div>
                        ))}
                    </div>
                )} />
                <Scatter data={data} shape="circle">
                    {data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} r={6} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
}
