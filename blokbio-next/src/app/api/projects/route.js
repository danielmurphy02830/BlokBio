import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, organism, samples } = body;
        if (!name) {
            return NextResponse.json({ error: "Project name is required" }, { status: 400 });
        }
        const project = await createProject({
            name,
            organism: organism || "Mus musculus",
            samples: samples || 0,
        });
        return NextResponse.json(project, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
