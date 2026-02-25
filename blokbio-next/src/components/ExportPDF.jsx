"use client";
import { useState } from "react";

export default function ExportPDF({ targetRef, filename = "blokbio-report" }) {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        if (!targetRef?.current) return;
        setExporting(true);
        try {
            const html2canvas = (await import("html2canvas")).default;
            const { jsPDF } = await import("jspdf");

            const canvas = await html2canvas(targetRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Multi-page support
            while (position < pdfHeight) {
                if (position > 0) pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
                position += pageHeight;
            }

            pdf.save(`${filename}.pdf`);
        } catch (e) {
            console.error("PDF export failed:", e);
        }
        setExporting(false);
    };

    return (
        <button onClick={handleExport} disabled={exporting}
            className="h-10 px-4 rounded-lg bg-white border border-[#e2e8f0] text-[#0f172a] text-sm font-bold hover:bg-[#f1f5f9] transition-colors flex items-center gap-2 disabled:opacity-50">
            <span className="material-symbols-outlined text-[18px]">
                {exporting ? "progress_activity" : "download"}
            </span>
            <span>{exporting ? "Exporting..." : "Download PDF"}</span>
        </button>
    );
}
