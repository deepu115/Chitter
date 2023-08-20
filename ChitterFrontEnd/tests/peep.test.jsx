
import { render, screen } from "@testing-library/react";
import Peeps from "../src/Components/Peeps";
import { describe, expect, test, vi } from "vitest";

// Mock the API call to get peeps
vi.mock("../src/asyncFunctions/peepApiCalls", () => ({
    getAllPeeps: vi.fn(() => Promise.resolve([
        { _id: "1", content: "testContent1", user: { username: "testUser1", name: "testName1" } },
        { _id: "2", content: "testContent2", user: { username: "testUser2", name: "testName2" } }
    ]))
}));

describe("Peeps Component", () => {


    test("displays peeps after fetching", async () => {
        render(<Peeps />);
        const firstPeepContent = await screen.findByText("testContent1");
        const secondPeepContent = await screen.findByText("testContent2");
        expect(firstPeepContent).toBeInTheDocument();
        expect(secondPeepContent).toBeInTheDocument();
    });

    // TODO: Add more tests for error scenarios, user interactions, etc.
});

