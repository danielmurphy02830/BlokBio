"use client";
import dynamic from "next/dynamic";

const GeneAIContent = dynamic(() => import("@/components/GeneAIChat"), { ssr: false });

export default function GeneAIPage() {
    return <GeneAIContent />;
}
