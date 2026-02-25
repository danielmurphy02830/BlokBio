import { NextResponse } from "next/server";
import { getProjectById, getAnalysisForProject } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const project = await getProjectById(id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        const analysis = getAnalysisForProject(id);
        return NextResponse.json({ ...project, analysis });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
