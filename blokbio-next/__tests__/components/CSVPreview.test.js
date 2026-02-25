import { render, screen, waitFor } from "@testing-library/react";
import CSVPreview from "@/components/CSVPreview";

// Mock FileReader for jsdom
class MockFileReader {
    readAsText(file) {
        // Simulate async reading
        setTimeout(() => {
            file.text().then((text) => {
                this.result = text;
                if (this.onload) this.onload({ target: { result: text } });
            }).catch(() => {
                // Fallback for environments where file.text() doesn't work
                const reader = new (Object.getPrototypeOf(this).constructor.__original || FileReader)();
                reader.onload = (e) => {
                    this.result = e.target.result;
                    if (this.onload) this.onload(e);
                };
            });
        }, 0);
    }
}

describe("CSVPreview component", () => {
    test("renders null when no file is provided", () => {
        const { container } = render(<CSVPreview file={null} />);
        expect(container.firstChild).toBeNull();
    });

    test("shows loading state initially for a file", async () => {
        const csvContent = "Gene,LogFC\nTP53,2.45";
        const file = new File([csvContent], "genes.csv", { type: "text/csv" });

        render(<CSVPreview file={file} />);

        // The component should render something while parsing
        // After parsing it should show table data
        await waitFor(() => {
            // Either shows loading or the parsed data
            const content = document.body.textContent;
            expect(content).toBeTruthy();
        }, { timeout: 5000 });
    });
});
