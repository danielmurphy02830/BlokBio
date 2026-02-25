"use client";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { pathwayData as defaultData } from "@/lib/mock-data";

export default function PathwayDotPlot({ data: externalData }) {
    const pathwayData = externalData || defaultData;

    const colors = pathwayData.map(d => {
        const norm = d.pAdj / 0.05;
        const r = Math.round(239 * norm + 59 * (1 - norm));
        const g = Math.round(68 * norm + 130 * (1 - norm));
        const b = Math.round(68 * norm + 246 * (1 - norm));
        return `rgb(${r},${g},${b})`;
    });

    const chartData = pathwayData.map((d, i) => ({
        ...d,
        y: i,
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 180 }}>
                <XAxis
                    type="number"
                    dataKey="geneRatio"
                    name="Gene Ratio"
                    domain={[0, 0.55]}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    label={{ value: "Gene Ratio", position: "insideBottom", offset: -10, style: { fontSize: 12, fill: "#64748b" } }}
                />
                <YAxis
                    type="number"
                    dataKey="y"
                    tick={{ fontSize: 11, fill: "#475569" }}
                    ticks={chartData.map(d => d.y)}
                    tickFormatter={(v) => chartData.find(d => d.y === v)?.name || ""}
                    width={170}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const pt = payload[0].payload;
                    return (
                        <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-lg">
                            <p className="font-bold">{pt.name}</p>
                            <p>Gene Ratio: {pt.geneRatio}</p>
                            <p>Count: {pt.count}</p>
                            <p>Adj. P: {pt.pAdj}</p>
                        </div>
                    );
                }} />
                <Scatter data={chartData} shape="circle">
                    {chartData.map((entry, i) => (
                        <Cell key={i} fill={colors[i]} r={Math.max(4, entry.count / 4)} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
}
