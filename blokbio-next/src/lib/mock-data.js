// Mock data ported from R services.R, db.R, and page modules

export const projects = [
    { id: "DLT-8921", name: "Mouse_Liver_Study_001", organism: "Mus musculus", samples: 12, lastUpdated: "2 hours ago", owner: "Dr. S. Chen", status: "QC Passed" },
    { id: "DLT-8924", name: "Human_CellLine_Treatment", organism: "Homo sapiens", samples: 6, lastUpdated: "15 mins ago", owner: "J. Doe", status: "Processing" },
    { id: "DLT-8800", name: "Yeast_HeatShock_Rep1", organism: "Saccharomyces cerevisiae", samples: 3, lastUpdated: "Yesterday", owner: "Dr. Aris", status: "DGEA Complete" },
    { id: "DLT-8755", name: "Zebrafish_Dev_Stage4", organism: "Danio rerio", samples: 24, lastUpdated: "3 days ago", owner: "J. Doe", status: "Upload Pending" },
];

export const dgeGenes = [
    { symbol: "IL6", id: "ENSG00000136244", logFC: 4.23, pVal: "1.2e-12", adjP: "4.5e-10", reg: "UP" },
    { symbol: "TNF", id: "ENSG00000232810", logFC: 3.89, pVal: "2.4e-11", adjP: "8.1e-10", reg: "UP" },
    { symbol: "TP53", id: "ENSG00000141510", logFC: -2.15, pVal: "5.6e-09", adjP: "1.2e-07", reg: "DOWN" },
    { symbol: "EGFR", id: "ENSG00000146648", logFC: -1.85, pVal: "1.1e-08", adjP: "3.4e-07", reg: "DOWN" },
    { symbol: "CXCL8", id: "ENSG00000169429", logFC: 3.12, pVal: "3.2e-10", adjP: "9.5e-09", reg: "UP" },
];

export const contrastGenes = [
    { gene: "TP53", log2FC: 2.45, adjP: 1.2e-8 },
    { gene: "BRCA1", log2FC: -1.82, adjP: 4.5e-6 },
    { gene: "EGFR", log2FC: 3.10, adjP: 2.1e-12 },
    { gene: "MYC", log2FC: 1.55, adjP: 0.001 },
    { gene: "VEGFA", log2FC: -2.01, adjP: 1.8e-4 },
    { gene: "KRAS", log2FC: 4.12, adjP: 9.2e-20 },
    { gene: "AKT1", log2FC: 1.67, adjP: 0.004 },
    { gene: "PTEN", log2FC: -1.45, adjP: 0.032 },
    { gene: "CDK4", log2FC: 2.88, adjP: 3.3e-9 },
    { gene: "RB1", log2FC: -3.01, adjP: 1.1e-15 },
];

export const contrastCounts = { a: 345, b: 1203, overlap: 142 };

export const qcSamples = [
    { id: "Control_01", condition: "Wild Type", reads: "28.4M", mapped: "98.5%", duplication: "12%", status: "pass" },
    { id: "Control_02", condition: "Wild Type", reads: "27.1M", mapped: "98.1%", duplication: "14%", status: "pass" },
    { id: "Control_03", condition: "Wild Type", reads: "22.5M", mapped: "92.4%", duplication: "28%", status: "warning" },
    { id: "Control_04", condition: "Wild Type", reads: "29.0M", mapped: "98.8%", duplication: "11%", status: "pass" },
];

// Generate volcano plot data (deterministic, matching R's mock)
function seededRandom(seed) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

export function generateVolcanoData() {
    const rng = seededRandom(42);
    const points = [];
    for (let i = 0; i < 500; i++) {
        // Box-Muller for normal distribution
        const u1 = rng(), u2 = rng();
        const fc = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 2;
        const pval = -Math.log10(rng());
        let color = "#cbd5e1"; // gray
        if (fc > 1 && pval > 1.3) color = "#ef4444"; // red - upregulated
        else if (fc < -1 && pval > 1.3) color = "#3b82f6"; // blue - downregulated
        points.push({ fc: +fc.toFixed(2), pval: +pval.toFixed(2), color, index: i });
    }
    return points;
}

export function generatePCAData() {
    const rng = seededRandom(123);
    const colors = ["#0d9488", "#3b82f6", "#a78bfa"];
    const labels = ["Treated", "Control", "Reference"];
    const points = [];
    for (let g = 0; g < 3; g++) {
        for (let i = 0; i < 4; i++) {
            const u1 = rng(), u2 = rng();
            const x = 5 + Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            const u3 = rng(), u4 = rng();
            const y = 5 + Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4);
            points.push({ x: +x.toFixed(2), y: +y.toFixed(2), color: colors[g], group: labels[g], label: `S${g * 4 + i + 1}` });
        }
    }
    return points;
}

export const pathwayData = [
    { name: "Cytokine-cytokine receptor", geneRatio: 0.45, count: 42, pAdj: 0.001 },
    { name: "TNF signaling pathway", geneRatio: 0.38, count: 35, pAdj: 0.005 },
    { name: "NF-kappa B signaling", geneRatio: 0.35, count: 30, pAdj: 0.008 },
    { name: "JAK-STAT signaling", geneRatio: 0.32, count: 28, pAdj: 0.012 },
    { name: "MAPK signaling pathway", geneRatio: 0.30, count: 25, pAdj: 0.015 },
    { name: "PI3K-Akt signaling", geneRatio: 0.28, count: 22, pAdj: 0.020 },
    { name: "Chemokine signaling", geneRatio: 0.25, count: 20, pAdj: 0.025 },
    { name: "Cell cycle", geneRatio: 0.22, count: 18, pAdj: 0.030 },
    { name: "Apoptosis", geneRatio: 0.18, count: 15, pAdj: 0.035 },
    { name: "p53 signaling pathway", geneRatio: 0.15, count: 12, pAdj: 0.042 },
];

export const navItems = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Projects", icon: "folder_open", href: "/workspaces" },
    { label: "Ingestion", icon: "upload_file", href: "/ingestion" },
    { label: "QC Analysis", icon: "analytics", href: "/qc" },
    { label: "Differential Expression", icon: "science", href: "/dgea" },
    { label: "Pathway Analysis", icon: "alt_route", href: "/pathway" },
    { label: "Contrast Analysis", icon: "donut_large", href: "/contrast" },
    { label: "GeneAI Assistant", icon: "auto_awesome", href: "/geneai" },
    { label: "Marketplace", icon: "storefront", href: "/marketplace" },
    { label: "Governance", icon: "shield", href: "/governance" },
    { label: "Connector", icon: "cable", href: "/connector" },
    { label: "Dev Portal", icon: "code", href: "/dev-portal" },
    { label: "Settings", icon: "settings", href: "#" },
];
