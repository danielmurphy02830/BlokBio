import { projects } from "@/lib/mock-data";

describe("Search filter logic", () => {
    function filterProjects(query) {
        if (!query) return projects;
        const q = query.toLowerCase();
        return projects.filter(
            (p) =>
                p.name?.toLowerCase().includes(q) ||
                p.id?.toLowerCase().includes(q) ||
                p.organism?.toLowerCase().includes(q)
        );
    }

    test("returns all projects when query is empty", () => {
        expect(filterProjects("")).toHaveLength(projects.length);
        expect(filterProjects(null)).toHaveLength(projects.length);
    });

    test("filters by project name", () => {
        const results = filterProjects("Mouse");
        expect(results.length).toBeGreaterThan(0);
        results.forEach((p) => {
            expect(p.name.toLowerCase()).toContain("mouse");
        });
    });

    test("filters by organism", () => {
        const results = filterProjects("Homo sapiens");
        expect(results.length).toBeGreaterThan(0);
        results.forEach((p) => {
            expect(p.organism.toLowerCase()).toContain("homo sapiens");
        });
    });

    test("filters by project ID", () => {
        const results = filterProjects("DLT-8921");
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe("DLT-8921");
    });

    test("returns empty array for non-matching query", () => {
        const results = filterProjects("xyznonexistent");
        expect(results).toHaveLength(0);
    });

    test("is case-insensitive", () => {
        const upper = filterProjects("MOUSE");
        const lower = filterProjects("mouse");
        expect(upper).toEqual(lower);
    });
});
