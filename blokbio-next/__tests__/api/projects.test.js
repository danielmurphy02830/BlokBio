import { getProjects, getProjectById, getAnalysisForProject } from "@/lib/db";

// Mock @vercel/postgres so it doesn't try to connect
jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

describe("Database helper functions (mock mode)", () => {
    beforeAll(() => {
        delete process.env.POSTGRES_URL;
    });

    test("getProjects returns mock projects when DB is not configured", async () => {
        const projects = await getProjects();
        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toBeGreaterThan(0);
        expect(projects[0]).toHaveProperty("id");
        expect(projects[0]).toHaveProperty("name");
        expect(projects[0]).toHaveProperty("organism");
    });

    test("getProjectById returns a project by ID from mock data", async () => {
        const project = await getProjectById("DLT-8921");
        expect(project).not.toBeNull();
        expect(project.name).toBe("Mouse_Liver_Study_001");
    });

    test("getProjectById returns null for unknown ID", async () => {
        const project = await getProjectById("NONEXISTENT");
        expect(project).toBeNull();
    });

    test("getAnalysisForProject returns analysis structure", () => {
        const analysis = getAnalysisForProject("DLT-8921");
        expect(analysis).toHaveProperty("qc");
        expect(analysis).toHaveProperty("dgea");
        expect(analysis).toHaveProperty("pathway");
        expect(analysis).toHaveProperty("pca");

        expect(analysis.qc.blokScore).toBe(94);
        expect(analysis.dgea.totalDEGs).toBe(1204);
        expect(analysis.dgea.topGenes.length).toBeGreaterThan(0);
        expect(analysis.pathway.data.length).toBeGreaterThan(0);
        expect(analysis.pca.data.length).toBeGreaterThan(0);
    });
});
