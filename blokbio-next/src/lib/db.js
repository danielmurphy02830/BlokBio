import { sql } from "@vercel/postgres";
import { projects as mockProjects } from "./mock-data";

// Check if DB is configured
const hasDB = !!process.env.POSTGRES_URL;

// Ensure table exists
let tableReady = false;
async function ensureTable() {
    if (!hasDB || tableReady) return;
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        organism TEXT DEFAULT 'Mus musculus',
        samples INTEGER DEFAULT 0,
        last_updated TEXT DEFAULT 'Just now',
        owner TEXT DEFAULT 'You',
        status TEXT DEFAULT 'Pending'
      )
    `;
        tableReady = true;
    } catch (e) {
        console.error("DB table creation failed:", e.message);
    }
}

export async function getProjects() {
    if (!hasDB) return mockProjects;
    try {
        await ensureTable();
        const { rows } = await sql`SELECT * FROM projects ORDER BY last_updated DESC`;
        if (rows.length === 0) return mockProjects; // fallback if empty
        return rows.map((r) => ({
            id: r.id,
            name: r.name,
            organism: r.organism,
            samples: r.samples,
            lastUpdated: r.last_updated,
            owner: r.owner,
            status: r.status,
        }));
    } catch (e) {
        console.error("DB read failed, using mock:", e.message);
        return mockProjects;
    }
}

export async function createProject({ name, organism, samples }) {
    if (!hasDB) {
        return { id: `DLT-${Math.floor(1000 + Math.random() * 9000)}`, name, organism, samples, lastUpdated: "Just now", owner: "You", status: "Pending" };
    }
    try {
        await ensureTable();
        const id = `DLT-${Math.floor(1000 + Math.random() * 9000)}`;
        await sql`
      INSERT INTO projects (id, name, organism, samples, last_updated, owner, status)
      VALUES (${id}, ${name}, ${organism}, ${samples}, 'Just now', 'You', 'Pending')
    `;
        return { id, name, organism, samples: Number(samples), lastUpdated: "Just now", owner: "You", status: "Pending" };
    } catch (e) {
        console.error("DB write failed:", e.message);
        throw new Error("Failed to create project");
    }
}
