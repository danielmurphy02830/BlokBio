import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Check if Blob is configured
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            // Mock response when Blob is not configured
            return NextResponse.json({
                url: "#",
                name: file.name,
                size: file.size,
                message: "File accepted (Blob storage not configured — file not persisted)",
            });
        }

        const blob = await put(file.name, file, {
            access: "public",
        });

        return NextResponse.json({
            url: blob.url,
            name: file.name,
            size: file.size,
        });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
