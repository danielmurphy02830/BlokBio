"use client";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { generateVolcanoData } from "@/lib/mock-data";

const data = generateVolcanoData();

export default function VolcanoPlot() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis type="number" dataKey="fc" name="Log2FC" domain={[-6, 6]} tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Log2 Fold Change", position: "insideBottom", offset: -10, style: { fontSize: 12, fill: "#64748b" } }} />
                <YAxis type="number" dataKey="pval" name="-Log10 P" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "-Log10 P-value", angle: -90, position: "insideLeft", offset: 5, style: { fontSize: 12, fill: "#64748b" } }} />
                <ReferenceLine y={1.3} stroke="#94a3b8" strokeDasharray="5 5" />
                <ReferenceLine x={-1} stroke="#94a3b8" strokeDasharray="5 5" />
                <ReferenceLine x={1} stroke="#94a3b8" strokeDasharray="5 5" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const pt = payload[0].payload;
                    return (
                        <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                            <p>Log2FC: {pt.fc}</p>
                            <p>-Log10P: {pt.pval}</p>
                        </div>
                    );
                }} />
                <Scatter data={data} shape="circle" fill="#cbd5e1">
                    {data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} r={3} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
}
